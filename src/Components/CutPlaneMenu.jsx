import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {Vector3} from 'three'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import useTheme from '../Theme'
import useStore from '../store/useStore'
import {addHashParams, getHashParams, getObjectParams, removeHashParams} from '../utils/location'
import {TooltipIconButton} from './Buttons'
import CutPlaneIcon from '../assets/2D_Icons/CutPlane.svg'
import {floatStrTrim, isNumeric} from '../utils/strings'
import debug from '../utils/debug'


const PLANE_PREFIX = 'p'


/**
 * BasicMenu used when there are several option behind UI button
 * show/hide from the right of the screen.
 *
 * @param {Array} listOfOptions Title for the drawer
 * @return {object} ItemPropertiesDrawer react component
 */
export default function CutPlaneMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const model = useStore((state) => state.modelStore)
  const viewer = useStore((state) => state.viewerStore)
  const cutPlanes = useStore((state) => state.cutPlanes)
  const addCutPlaneDirection = useStore((state) => state.addCutPlaneDirection)
  const removeCutPlaneDirection = useStore((state) => state.removeCutPlaneDirection)
  const setLevelInstance = useStore((state) => state.setLevelInstance)
  const location = useLocation()
  const open = Boolean(anchorEl)
  const theme = useTheme()

  debug().log('CutPlaneMenu: location: ', location)
  debug().log('CutPlaneMenu: cutPlanes: ', cutPlanes)


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }


  const handleClose = () => {
    setAnchorEl(null)
  }


  useEffect(() => {
    const planeHash = getHashParams(location, 'p')
    debug().log('CutPlaneMenu#useEffect: planeHash: ', planeHash)
    if (planeHash && model && viewer) {
      const planes = getPlanes(planeHash)
      debug().log('CutPlaneMenu#useEffect: planes: ', planes)
      if (planes && planes.length) {
        planes.forEach((plane) => {
          togglePlane(plane)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model])


  const togglePlane = ({direction, offset = 0}) => {
    setLevelInstance(null)
    const modelCenter = new Vector3
    model?.geometry.boundingBox.getCenter(modelCenter)
    setAnchorEl(null)
    const {normal, modelCenterOffset} = getPlaneInfo({modelCenter, direction, offset})
    debug().log('CutPlaneMenu#togglePlane: ifcPlanes: ', viewer.clipper.planes)

    if (cutPlanes.findIndex((cutPlane) => cutPlane.direction === direction) > -1) {
      debug().log('CutPlaneMenu#togglePlane: found: ', true)
      removeHashParams(window.location, PLANE_PREFIX, [direction])
      removeCutPlaneDirection(direction)
      viewer.clipper.deleteAllPlanes()
      const restCutPlanes = cutPlanes.filter((cutPlane) => cutPlane.direction !== direction)
      restCutPlanes.forEach((restCutPlane) => {
        const planeInfo = getPlaneInfo({modelCenter, direction: restCutPlane.direction, offset: restCutPlane.offset})
        viewer.clipper.createFromNormalAndCoplanarPoint(planeInfo.normal, planeInfo.modelCenterOffset)
      })
    } else {
      debug().log('CutPlaneMenu#togglePlane: found: ', false)
      addHashParams(window.location, PLANE_PREFIX, {[direction]: offset}, true)
      addCutPlaneDirection({direction, offset})
      viewer.clipper.createFromNormalAndCoplanarPoint(normal, modelCenterOffset)
    }
  }


  return (
    <div>
      <TooltipIconButton
        title={'Section'}
        icon={<CutPlaneIcon/>}
        onClick={handleClick}
        selected={anchorEl !== null || !!cutPlanes.length}
      />
      <Menu
        elevation={1}
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
        PaperProps={{
          style: {
            left: '300px',
            transform: 'translateX(-50px)',
          },
          sx: {
            '& .Mui-selected': {
              color: theme.theme.palette.highlight.main,
              fontWeight: 600,
            },
          },
        }}
      >
        <MenuItem onClick={() => togglePlane({direction: 'x'})}
          selected={cutPlanes.findIndex((cutPlane) => cutPlane.direction === 'x') > -1}
        >X
        </MenuItem>
        <MenuItem onClick={() => togglePlane({direction: 'y'})}
          selected={cutPlanes.findIndex((cutPlane) => cutPlane.direction === 'y') > -1}
        >Y
        </MenuItem>
        <MenuItem onClick={() => togglePlane({direction: 'z'})}
          selected={cutPlanes.findIndex((cutPlane) => cutPlane.direction === 'z') > -1}
        >Z
        </MenuItem>
      </Menu>
    </div>
  )
}


/**
 * removePlanes delete all section planes from the viewer
 *
 * @param {object} viewer bounding box
 */
export function removePlanes(viewer) {
  viewer?.clipper.deleteAllPlanes()
  const clippingPlanes = viewer?.clipper['context'].clippingPlanes
  for (const plane of clippingPlanes) {
    viewer?.clipper['context'].removeClippingPlane(plane)
  }
}


/**
 * helper method to get the location of cut plane from the center of the model
 *
 * @param {object} viewer
 * @param {object} ifcModel
 * @return {object} offsetObj contains plane normal access as a key and offset as a value
 */
export function getPlaneOffset(viewer, ifcModel) {
  if (viewer.clipper.planes.length > 0) {
    let planeNormal
    let planeAxisCenter
    let planeOffsetFromCenter
    let planeHash
    const planeOffsetFromModelBoundary = viewer.clipper.planes[0].plane.constant
    const modelCenter = new Vector3
    ifcModel?.geometry.boundingBox.getCenter(modelCenter)
    for (const [key, value] of Object.entries(viewer.clipper.planes[0].plane.normal)) {
      if (value !== 0) {
        planeNormal = key
        planeAxisCenter = modelCenter[planeNormal]
        planeOffsetFromCenter = planeOffsetFromModelBoundary - planeAxisCenter
        planeHash = `${planeNormal}=${planeOffsetFromCenter}`
      }
    }
    const planeOffsetObj = {planeAxis: planeHash}
    return planeOffsetObj
  }
}


/**
 * helper method to add plane normal and the offset to the url as a hash parameter
 *
 * @param {object} viewer
 * @param {object} ifcModel
 */
export function addPlaneLocationToUrl(viewer, ifcModel) {
  if (viewer.clipper.planes.length > 0) {
    const planeOffset = getPlaneOffset(viewer, ifcModel)
    addHashParams(window.location, PLANE_PREFIX, planeOffset)
  }
}


/**
 * get offset info of x, y, z from plane hash string
 *
 * @param {string} planeHash
 * @return {Array}
 */
function getPlanes(planeHash) {
  if (!planeHash) {
    return []
  }
  const parts = planeHash.split(':')
  if (parts[0] !== 'p' || !parts[1]) {
    return []
  }
  const planeObjectParams = getObjectParams(planeHash)
  debug().log('CutPlaneMenu#getPlanes: planeObjectParams: ', planeObjectParams)
  const planes = []
  Object.entries(planeObjectParams).forEach((entry) => {
    const [key, value] = entry
    const removableParamKeys = []
    if (isNumeric(key)) {
      removableParamKeys.push(key)
    } else {
      planes.push({
        direction: key,
        offset: floatStrTrim(value),
      })
    }
    if (removableParamKeys.length) {
      removeHashParams(window.location, PLANE_PREFIX, removableParamKeys)
    }
  })
  debug().log('CutPlaneMenu#getPlanes: planes: ', planes)
  return planes
}


/**
 * get plane information (normal, model center offset)
 *
 * @param {Vector3} modelCenter
 * @param {string} direction
 * @param {number} offset
 * @return {object}
 */
function getPlaneInfo({modelCenter, direction, offset = 0}) {
  let normal
  let planeOffsetX = 0
  let planeOffsetY = 0
  let planeOffsetZ = 0
  const finiteOffset = floatStrTrim(offset)

  switch (direction) {
    case 'x':
      normal = new Vector3(-1, 0, 0)
      planeOffsetX = finiteOffset
      break
    case 'y':
      normal = new Vector3(0, -1, 0)
      planeOffsetY = finiteOffset
      break
    case 'z':
      normal = new Vector3(0, 0, -1)
      planeOffsetZ = finiteOffset
      break
    default:
      normal = new Vector3(0, 1, 0)
      break
  }

  const modelCenterOffset = new Vector3(modelCenter.x + planeOffsetX, modelCenter.y + planeOffsetY, modelCenter.z + planeOffsetZ)
  return {normal, modelCenterOffset}
}

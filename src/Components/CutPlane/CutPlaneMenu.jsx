import React, {ReactElement, useCallback, useEffect, useState, useRef} from 'react'
import {useLocation} from 'react-router-dom'
import {Vector3} from 'three'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import useStore from '../../store/useStore'
import debug from '../../utils/debug'
import {floatStrTrim} from '../../utils/strings'
import {TooltipIconButton} from '../Buttons'
import {
  addHashParams,
  getHashParams,
  getPlanesFromHash,
  removeHashParams,
} from './hashState'
import CloseIcon from '@mui/icons-material/Close'
import CropOutlinedIcon from '@mui/icons-material/CropOutlined'
import ElevationIcon from '../../assets/icons/Elevation.svg'
import PlanIcon from '../../assets/icons/Plan.svg'
import SectionIcon from '../../assets/icons/Section.svg'


/**
 * Menu of three cut planes for the model
 *
 * @return {ReactElement}
 */
export default function CutPlaneMenu() {
  const model = useStore((state) => state.model)
  const viewer = useStore((state) => state.viewer)
  const cutPlanes = useStore((state) => state.cutPlanes)
  const addCutPlaneDirection = useStore((state) => state.addCutPlaneDirection)
  const removeCutPlaneDirection = useStore((state) => state.removeCutPlaneDirection)
  const setLevelInstance = useStore((state) => state.setLevelInstance)
  const setCutPlaneDirections = useStore((state) => state.setCutPlaneDirections)

  const isCutPlaneActive = useStore((state) => state.isCutPlaneActive)
  const setIsCutPlaneActive = useStore((state) => state.setIsCutPlaneActive)

  const [anchorEl, setAnchorEl] = useState(null)

  const location = useLocation()

  const isMenuVisible = Boolean(anchorEl)

  debug().log('CutPlaneMenu: location: ', location)
  debug().log('CutPlaneMenu: cutPlanes: ', cutPlanes)

  const handleClose = () => setAnchorEl(null)

  const togglePlane = useCallback(({direction, offset = 0}) => {
    setLevelInstance(null)
    const modelCenter = new Vector3
    model?.geometry.boundingBox.getCenter(modelCenter)
    setAnchorEl(null)
    const {normal, modelCenterOffset} = getPlaneSceneInfo({modelCenter, direction, offset})
    debug().log('CutPlaneMenu#togglePlane: normal: ', normal)
    debug().log('CutPlaneMenu#togglePlane: modelCenterOffset: ', modelCenterOffset)
    debug().log('CutPlaneMenu#togglePlane: ifcPlanes: ', viewer.clipper.planes)

    if (cutPlanes.findIndex((cutPlane) => cutPlane.direction === direction) > -1) {
      debug().log('CutPlaneMenu#togglePlane: found, removing...')
      removeHashParams(location, [direction])
      removeCutPlaneDirection(direction)
      viewer.clipper.deleteAllPlanes()
      const restCutPlanes = cutPlanes.filter((cutPlane) => cutPlane.direction !== direction)
      restCutPlanes.forEach((restCutPlane) => {
        const planeInfo = getPlaneSceneInfo({modelCenter, direction: restCutPlane.direction, offset: restCutPlane.offset})
        viewer.clipper.createFromNormalAndCoplanarPoint(planeInfo.normal, planeInfo.modelCenterOffset)
      })
      if (restCutPlanes.length === 0) {
        setIsCutPlaneActive(false)
      }
    } else {
      debug().log('CutPlaneMenu#togglePlane: not found, adding...')
      addHashParams(location, {[direction]: offset})
      addCutPlaneDirection({direction, offset})
      viewer.clipper.createFromNormalAndCoplanarPoint(normal, modelCenterOffset)
      setIsCutPlaneActive(true)
    }
  }, [addCutPlaneDirection, cutPlanes, location, model?.geometry.boundingBox, removeCutPlaneDirection,
      setIsCutPlaneActive, setLevelInstance, viewer?.clipper])


  const lastHashRef = useRef('')
  useEffect(() => {
    if (!(model && viewer)) {
      return
    }

    const planeHash = getHashParams(location)
    if (lastHashRef.current === planeHash) {
      return
    }
    lastHashRef.current = planeHash
    const planes = getPlanesFromHash(planeHash)
    if (planes && planes.length) {
      setIsCutPlaneActive(true)
      planes.forEach((plane) => {
        togglePlane(plane)
      })
    }
  }, [lastHashRef, location, model, setIsCutPlaneActive, togglePlane, viewer])

  return (
    <>
      <TooltipIconButton
        title={'Section'}
        icon={<CropOutlinedIcon className='icon-share'/>}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        selected={anchorEl !== null || !!cutPlanes.length || isCutPlaneActive}
        variant='control'
        placement='top'
        dataTestId='control-button-cut-plane'
      />
      <Menu
        elevation={1}
        id='basic-menu'
        anchorEl={anchorEl}
        open={isMenuVisible}
        onClose={handleClose}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        transformOrigin={{vertical: 'bottom', horizontal: 'center'}}
        data-testid='menu-cut-plane'
      >
        <MenuItem
          onClick={() => togglePlane({direction: 'y'})}
          selected={cutPlanes.findIndex((cutPlane) => cutPlane.direction === 'y') > -1}
          data-testid='menu-item-plan'
        >
          <SvgIcon><PlanIcon className='icon-share'/></SvgIcon>
          <Typography sx={{marginLeft: '10px'}} variant='overline'>Plan</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => togglePlane({direction: 'x'})}
          selected={cutPlanes.findIndex((cutPlane) => cutPlane.direction === 'x') > -1}
          data-testid='menu-item-section'
        >
          <SvgIcon><SectionIcon className='icon-share'/></SvgIcon>
          <Typography sx={{marginLeft: '10px'}} variant='overline'>Section</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => togglePlane({direction: 'z'})}
          selected={cutPlanes.findIndex((cutPlane) => cutPlane.direction === 'z') > -1}
          data-testid='menu-item-elevation'
        >
          <SvgIcon><ElevationIcon className='icon-share'/></SvgIcon>
          <Typography sx={{marginLeft: '10px'}} variant='overline'>Elevation</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            resetState(location, viewer, setCutPlaneDirections, setIsCutPlaneActive)
          }}
          data-testid='menu-item-clear-all'
        >
          <CloseIcon className='icon-share'/>
          <Typography sx={{marginLeft: '10px'}} variant='overline'>Clear all</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}


/**
 * Called by this component and CadView for consistent reset
 *
 * @param {object} location from react-router
 * @param {object} viewer
 * @param {Function} setCutPlaneDirections
 * @param {Function} setIsCutPlaneActive
 */
export function resetState(location, viewer, setCutPlaneDirections, setIsCutPlaneActive) {
  // These aren't setup when CadView inits
  if (location && viewer && setCutPlaneDirections && setIsCutPlaneActive) {
    removePlanes(viewer)
    removeHashParams(location)
    setCutPlaneDirections([])
    setIsCutPlaneActive(false)
  }
}


/**
 * Deletes all section planes from the viewer
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
 * Get the location of cut plane from the center of the model
 *
 * @param {object} viewer
 * @param {object} ifcModel
 * @return {object} {x: 0, y: 0, ...}
 */
export function getPlanesOffset(viewer, ifcModel) {
  if (viewer.clipper.planes.length > 0) {
    let planeNormal
    let planeAxisCenter
    let planeOffsetFromCenter
    const planesOffset = {}
    const modelCenter = new Vector3
    ifcModel?.geometry.boundingBox.getCenter(modelCenter)
    debug().log('CutPlaneMenu#getPlanesOffset: modelCenter: ', modelCenter)
    viewer.clipper.planes.forEach((plane) => {
      for (const [key, value] of Object.entries(plane.plane.normal)) {
        if (value !== 0) {
          const planeOffsetFromModelBoundary = plane.plane.constant
          planeNormal = key
          planeAxisCenter = modelCenter[planeNormal]
          planeOffsetFromCenter = planeOffsetFromModelBoundary - planeAxisCenter
          planesOffset[planeNormal] = floatStrTrim(planeOffsetFromCenter)
        }
      }
    })
    return planesOffset
  }
  return undefined
}


/**
 * Get plane information (normal, model center offset)
 *
 * @param {Vector3} modelCenter
 * @param {string} direction
 * @param {number} offset
 * @return {object}
 */
export function getPlaneSceneInfo({modelCenter, direction, offset = 0}) {
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

  const modelCenterOffset =
        new Vector3(
          modelCenter.x + planeOffsetX,
          modelCenter.y + planeOffsetY,
          modelCenter.z + planeOffsetZ)
  return {normal, modelCenterOffset}
}

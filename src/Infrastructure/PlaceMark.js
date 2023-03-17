import {
  EventDispatcher,
  Mesh,
  Vector2,
} from 'three'
import {IfcContext} from 'web-ifc-viewer/dist/components'
import {PLACE_MARK_DISTANCE} from '../utils/constants'
import debug from '../utils/debug'
import {floatStrTrim} from '../utils/strings'
import {getSvgGroupFromObj, getSvgObjFromUrl} from '../utils/svg'
import {raycaster} from '../utils/constants'
import createComposer from './CustomPostProcessing'


/**
 * PlaceMark to share notes
 */
export default class PlaceMark extends EventDispatcher {
  /**
   * @param {IfcContext} context
   */
  constructor({context}) {
    super()
    debug().log('PlaceMark#constructor: context: ', context)
    const _domElement = context.getDomElement()
    const _camera = context.getCamera()
    const _scene = context.getScene()
    const _renderer = context.getRenderer()
    const {composer, outlineEffect} = createComposer(_renderer, _scene, _camera)
    const _pointer = new Vector2()
    let _objects = []
    const _placeMarks = []


    this.activated = false
    _domElement.style.touchAction = 'none' // disable touch scroll


    this.activate = () => {
      this.activated = true
      _domElement.style.cursor = 'alias'
    }


    this.deactivate = () => {
      this.activated = false
      _domElement.style.cursor = 'default'
    }


    this.setObjects = (objects) => {
      _objects = objects
    }


    this.onSceneDoubleClick = (event) => {
      let res = {}

      switch (event.button) {
        case 0: // Main button (left button)
          res = dropPlaceMark(event)
          break
        case 1: // Wheel button (middle button if present)
          break
        // eslint-disable-next-line no-magic-numbers
        case 2: // Secondary button (right button)
          break
        // eslint-disable-next-line no-magic-numbers
        case 3: // Fourth button (back button)
          break
        // eslint-disable-next-line no-magic-numbers
        case 4: // Fifth button (forward button)
          break
        default:
          break
      }

      return res
    }


    this.onSceneClick = (event) => {
      let res = {}

      switch (event.button) {
        case 0: // Main button (left button)
          if (event.shiftKey) {
            res = dropPlaceMark(event)
          } else {
            res = getPlaceMarkGroup()
          }
          break
        case 1: // Wheel button (middle button if present)
          break
        // eslint-disable-next-line no-magic-numbers
        case 2: // Secondary button (right button)
          break
        // eslint-disable-next-line no-magic-numbers
        case 3: // Fourth button (back button)
          break
        // eslint-disable-next-line no-magic-numbers
        case 4: // Fifth button (forward button)
          break
        default:
          break
      }

      return res
    }


    this.putDown = ({point, lookAt, fillColor = 'black', height}) => {
      debug().log('PlaceMark#putDown: point: ', point)
      debug().log('PlaceMark#putDown: lookAt: ', lookAt) // Not using yet since place mark always look at front
      return new Promise((resolve, reject) => {
        getSvgObjFromUrl('/icons/PlaceMark.svg').then((svgObj) => {
          const svgGroup = getSvgGroupFromObj({svgObj, fillColor, layer: 'placemark', height})
          svgGroup.position.copy(point)
          _scene.add(svgGroup)
          _placeMarks.push(svgGroup)
          debug().log('PlaceMark#putDown#getSvgGroupFromObj: _placeMarks: ', _placeMarks)
          const placeMarkMeshSet = getPlaceMarkMeshSet()
          debug().log('PlaceMark#putDown#getSvgGroupFromObj: placeMarkMeshSet: ', placeMarkMeshSet)
          debug().log('PlaceMark#putDown#getSvgGroupFromObj: placeMarkMeshSet.size: ', placeMarkMeshSet.size)
          outlineEffect.setSelection(placeMarkMeshSet)
          resolve(svgGroup)
        })
      })
    }


    this.disposePlaceMark = (svgGroup) => {
      debug().log('PlaceMark#disposePlaceMark: before place marks count: ', _placeMarks.length)
      const index = _placeMarks.indexOf(svgGroup)

      if (index > -1) {
        _placeMarks.splice(index, 1)
        _scene.remove(svgGroup)
      }

      debug().log('PlaceMark#disposePlaceMark: after place marks count: ', _placeMarks.length)
    }


    const updatePointer = (event) => {
      const rect = _domElement.getBoundingClientRect()
      // eslint-disable-next-line no-magic-numbers, no-mixed-operators
      _pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      // eslint-disable-next-line no-magic-numbers, no-mixed-operators
      _pointer.y = (-(event.clientY - rect.top) / rect.height) * 2 + 1
    }


    const dropPlaceMark = (event) => {
      let res = {}
      // this.activated = true // To test without notes

      if (_objects && this.activated) {
        updatePointer(event)
        const _intersections = []
        _intersections.length = 0
        raycaster.setFromCamera(_pointer, _camera)
        raycaster.intersectObjects(_objects, true, _intersections)
        debug().log('PlaceMark#dropPlaceMark: _intersections: ', _intersections)

        if (_intersections.length > 0) {
          const intersectPoint = _intersections[0].point.clone()
          intersectPoint.x = floatStrTrim(intersectPoint.x)
          intersectPoint.y = floatStrTrim(intersectPoint.y)
          intersectPoint.z = floatStrTrim(intersectPoint.z)
          const offset = _intersections[0].face.normal.clone().multiplyScalar(PLACE_MARK_DISTANCE)
          debug().log('PlaceMark#dropPlaceMark: offset: ', offset)
          const point = intersectPoint.clone().add(offset)
          const lookAt = point.clone().add(_intersections[0].face.normal.clone())
          const promiseGroup = this.putDown({point, lookAt})
          res = {point, lookAt, promiseGroup}
        }
      }

      return res
    }


    const getPlaceMarkGroup = () => {
      let res = {}
      debug().log('PlaceMark#getPlaceMarkGroup: _placeMarks: ', _placeMarks)

      if (_placeMarks.length) {
        updatePointer(event)
        const _intersections = []
        _intersections.length = 0
        raycaster.setFromCamera(_pointer, _camera)
        raycaster.intersectObjects(_placeMarks, true, _intersections)
        debug().log('PlaceMark#getPlaceMarkGroup: _intersections: ', _intersections)
        if (_intersections.length) {
          res = {url: _intersections[0].object?.userData?.url}
        }
      }

      return res
    }


    const getPlaceMarkMeshSet = () => {
      const placeMarkMeshSet = new Set()
      _placeMarks.forEach((placeMark) => {
        placeMark.traverse((child) => {
          if (child instanceof Mesh) {
            placeMarkMeshSet.add(child)
          }
        })
      })
      debug().log('PlaceMark#getPlaceMarkMeshes: placeMarkMeshSet: ', placeMarkMeshSet)
      return placeMarkMeshSet
    }


    const newRendererUpdate = () => {
      /**
       * Overrides the default update function in the context renderer
       *
       * @param {number} _delta
       */
      function newUpdateFn(_delta) {
        if (!context) {
          return
        }
        _placeMarks.forEach((_placeMark) => {
          _placeMark.quaternion.copy(_camera.quaternion)
        })
        composer.render()
      }
      return newUpdateFn.bind(context.renderer)
    }


    if (context.renderer) {
      // eslint-disable-next-line max-len
      // This patch applies to https://github.com/IFCjs/web-ifc-viewer/blob/9ce3a42cb8d4ffd5b78b19d56f3b4fad2d1f3c0e/viewer/src/components/context/renderer/renderer.ts#L44
      context.renderer.update = newRendererUpdate()
    }
  }
}

import {
  EventDispatcher,
  Raycaster,
  Vector2,
} from 'three'
import {IfcContext} from 'web-ifc-viewer/dist/components'
import debug from '../utils/debug'
import {getSVGGroup} from '../utils/svg'


/**
 * PlaceMark
 */
export default class PlaceMark extends EventDispatcher {
  /**
   * @param {IfcContext} context
   */
  constructor(context) {
    super()
    debug().log('PlaceMark#constructor: context: ', context)
    const _domElement = context.getDomElement()
    const _camera = context.getCamera()
    const _scene = context.getScene()
    // const _renderer = context.getRenderer()
    const _raycaster = new Raycaster()
    const _pointer = new Vector2()
    let _objects = []
    const _placeMarks = []


    _domElement.style.touchAction = 'none' // disable touch scroll


    /**
     * @param {Event} event
     */
    function updatePointer(event) {
      const rect = _domElement.getBoundingClientRect()
      // eslint-disable-next-line no-magic-numbers, no-mixed-operators
      _pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      // eslint-disable-next-line no-magic-numbers, no-mixed-operators
      _pointer.y = (-(event.clientY - rect.top) / rect.height) * 2 + 1
    }


    this.activated = false


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


    this.onDoubleTap = (event) => {
      debug().log('PlaceMark#onDoubleTap: ', event)
      if (!_objects || !this.activated) {
        return
      }
      updatePointer(event)
      const _intersections = []
      _intersections.length = 0
      _raycaster.setFromCamera(_pointer, _camera)
      _raycaster.intersectObjects(_objects, true, _intersections)
      debug().log('PlaceMark#onDoubleTap: _intersections: ', _intersections)

      if (_intersections.length > 0) {
        getSVGGroup({url: '/icons/PlaceMarkOff.svg'}).then((group) => {
          group.position.copy(_intersections[0].point)
          debug().log('PlaceMark#onDoubleTap#getSVGGroup: ', group)
          _scene.add(group)
          _placeMarks.push(group)
        })
        return _intersections[0].point
      } else {
        return null
      }
    }
  }
}

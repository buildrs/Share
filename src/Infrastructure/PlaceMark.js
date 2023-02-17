import {
  EventDispatcher,
  Raycaster,
  Vector2,
} from 'three'
import {IfcContext} from 'web-ifc-viewer/dist/components'
import debug from '../utils/debug'
import {floatStrTrim} from '../utils/strings'
import {getSVGMesh} from '../utils/svg'


/**
 * PlaceMark to share notes
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


    this.activated = false
    _domElement.style.touchAction = 'none' // disable touch scroll


    const updatePointer = (event) => {
      const rect = _domElement.getBoundingClientRect()
      // eslint-disable-next-line no-magic-numbers, no-mixed-operators
      _pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      // eslint-disable-next-line no-magic-numbers, no-mixed-operators
      _pointer.y = (-(event.clientY - rect.top) / rect.height) * 2 + 1
    }


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


    this.onDrop = (event) => {
      debug().log('PlaceMark#drop: ', event)
      if (!_objects || !this.activated) {
        return
      }
      updatePointer(event)
      const _intersections = []
      _intersections.length = 0
      _raycaster.setFromCamera(_pointer, _camera)
      _raycaster.intersectObjects(_objects, true, _intersections)
      debug().log('PlaceMark#drop: _intersections: ', _intersections)

      if (_intersections.length > 0) {
        const intersectPoint = _intersections[0].point
        intersectPoint.x = floatStrTrim(intersectPoint.x)
        intersectPoint.y = floatStrTrim(intersectPoint.y)
        intersectPoint.z = floatStrTrim(intersectPoint.z)
        this.putDown(intersectPoint)
        return intersectPoint
      } else {
        return null
      }
    }

    this.putDown = (point) => {
      // getSVGGroup({url: '/icons/PlaceMark.svg'}).then((group) => {
      //   group.position.copy(point)
      //   debug().log('PlaceMark#putDown#getSVGGroup: ', group)
      //   _scene.add(group)
      //   _placeMarks.push(group)
      // })
      getSVGMesh({url: '/icons/PlaceMark.svg', color: 'red'}).then((mesh) => {
        debug().log('PlaceMark#putDown#getSVGMesh: ', mesh)
        mesh.position.copy(point)
        _scene.add(mesh)
        _placeMarks.push(mesh)
      })
    }
  }
}

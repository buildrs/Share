import {
  WebGLRenderer,
  Camera,
  Scene
} from 'three'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
//import {EffectPass} from 'three/examples/jsm/postprocessing/EffectPass'
//import {OutlineEffect} from 'three/examples/jsm/postprocessing/OutlineEffect'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {SSAOPass} from 'three/examples/jsm/postprocessing/SSAOPass'

/**
 *  A custom post processor utility
 */
export default class CustomPostProcessor {
  _composer = null
  _scene = null
  _camera = null
  static _instance = null

  /**
   * Instanciates a new CustomPostProcessor
   *
   * @param {WebGLRenderer} the renderer
   * @param {Scene} three.js scene
   * @param {Camera} the camera
   */
  constructor(renderer, scene, camera) {
    this._composer = new EffectComposer(renderer)
    this._composer.addPass(new RenderPass(scene, camera))
    /*
    const sp = new SSAOPass(scene, camera)
    sp.radius = 10
    sp.aoClamp = 0.3
    sp.lumInfluence = 0.7
    this._composer.addPass(sp)
    */
    this._scene = scene
    this._camera = camera
  }

  /**
   * Gets the composer
   *
   * @return {EffectComposer} the composer
   */
  get getComposer() {
    return this._composer
  }

  /**
   * Creates a new outline effect and adds it to the composer
   *
   * @param {object} the outline effect options
   * @return {OutlineEffect} the outline effect
   */
  createOutlineEffect(effectOpts) {
    // const outlineEffect = new OutlineEffect(this._scene, this._camera, effectOpts)
    // const selectionOutlinePass = new EffectPass(this._camera, outlineEffect)
    // this._composer.addPass(selectionOutlinePass)
    return null //outlineEffect
  }
}

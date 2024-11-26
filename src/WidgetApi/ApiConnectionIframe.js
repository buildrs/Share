import {WidgetApi as MatrixWidgetApi} from 'matrix-widget-api/lib/WidgetApi'
import {MatrixCapabilities} from 'matrix-widget-api/lib/interfaces/Capabilities'
import AbstractApiConnection from './ApiConnection'


/**
 * ApiConnection to Iframed bldrs instance
 */
export default class ApiConnectionIframe extends AbstractApiConnection {
  widgetId = 'bldrs-share'
  matrixWidgetApi = null

  /**
   * constructor
   */
  constructor() {
    super()
    this.matrixWidgetApi = new MatrixWidgetApi(this.widgetId)
    this.matrixWidgetApi.requestCapabilities([MatrixCapabilities.AlwaysOnScreen])
  }

  /**
   * event resolver.
   *
   * @param {string} eventName
   * @param {Function} callable
   */
  on(eventName, callable) {
    console.log('ApiConnectionIframe#on, eventName:', eventName)
    this.matrixWidgetApi.on(
        eventName,
        (event) => {
          event.preventDefault()
          const response = callable(event.detail.data)
          this.matrixWidgetApi.transport.reply(event.detail, response)
        },
    )
  }

  /**
   * send event.
   *
   * @param {string} eventName
   * @param {object} data
   */
  send(eventName, data) {
    console.log('ApiConnectionIframe#send: eventName:', eventName)
    this.matrixWidgetApi.transport.send(eventName, data)
  }

  /**
   * requests capabilities.
   *
   * @param {string[]} capabilities
   */
  requestCapabilities(capabilities) {
    console.log('ApiConnectionIframe#send: requestCapabilities:', capabilities)
    this.matrixWidgetApi.requestCapabilities(capabilities)
  }

  /**
   * starts the api.
   */
  start() {
    console.log('ApiConnectionIframe#send: start & sendContentLoaded!')
    this.matrixWidgetApi.start()
    this.matrixWidgetApi.sendContentLoaded()
  }

  /**
   * stops the api.
   */
  stop() {
    this.matrixWidgetApi.stop()
  }
}

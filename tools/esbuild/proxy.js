import http from 'node:http'
import https from 'node:https'
import path from 'node:path'
import fs from 'node:fs'
import {fileURLToPath} from 'url'
import {dirname} from 'path'

// Define __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * @param {string} proxiedHost The host to which traffic will be sent. E.g. localhost
 * @param {number} port The port to which traffic will be sent.  E.g. 8079
 * @param {boolean} useHttps Whether to use HTTPS for the proxied server
 * @return {object} Proxy server
 * @see https://esbuild.github.io/api/#serve-proxy
 */
export function createProxyServer(host, port, useHttps = false) {
  const requestModule = useHttps ? https : http

  return http.createServer((req, res) => {
    // Attempt to serve directly from node_modules
    if (serveFileFromNodeModules(req, res)) {
      // File was served, no further processing needed
      return
    }
    // Rewrite the URL if it matches the pattern for a .wasm file
    req.url = rewriteUrl(req.url)

    const options = {
      hostname: host,
      port: port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    }

    // Forward each incoming request to the proxied server
    const proxyReq = requestModule.request(options, (proxyResponse) => {
      // If proxied server cannot find the resource, send a custom not-found page
      if (proxyResponse.statusCode === HTTP_NOT_FOUND) {
        serveNotFound(res)
        return
      }

      // Set the correct Content-Type for specific file types
      const contentType = getContentType(req.url)
      if (contentType) {
        res.setHeader('Content-Type', contentType)
      }

      // Optionally set Cache-Control headers for static assets
      if (isCacheable(req.url)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000')
      }

      // Forward the response from the proxied server to the client
      res.writeHead(proxyResponse.statusCode, proxyResponse.headers)
      proxyResponse.pipe(res, {end: true})
    })

    // Handle request errors
    proxyReq.on('error', (err) => {
      console.error(`Proxy request error: ${err.message}`)
      res.writeHead(HTTP_SERVER_ERROR)
      res.end('Internal Server Error')
    })

    // Forward the body of the request to the proxied server
    req.pipe(proxyReq, {end: true})
  })
}

const HTTP_FOUND = 200
const HTTP_NOT_FOUND = 404
const HTTP_SERVER_ERROR = 500

/** Serve a 200 bounce page for missing resources. */
const serveNotFound = (res) => {
  res.writeHead(HTTP_FOUND, {'Content-Type': 'text/html'})
  res.end(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>BLDRS - Redirect</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = window.location.pathname.startsWith('/Share') ? 1 : 0
      var l = window.location
      var u1 = l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '')
      var u2 = l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/'
      var u3 = l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~')
      var u4 = (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '')
      l.replace(u1 + u2 + u3 + u4 + l.hash)
    </script>
  </head>
  <body>
    Resource not found. Redirecting...
  </body>
</html>`)
}

/**
 * Rewrite the URL if it's a .wasm file.
 *
 * @param {string} url The original request URL
 * @return {string} The rewritten URL
 */
function rewriteUrl(url) {
  // Regular expression to match any URL that ends with .wasm
  const regex = /^.*\.wasm$/

  // If the URL matches the regex, rewrite it
  if (regex.test(url)) {
    return '/static/js/ConwayGeomWasmWeb.wasm'
  }

  return url
}

/**
 * Serves a file directly from the `node_modules` directory based on the requested URL.
 *
 * This function checks if the request URL targets a file in `node_modules`.
 * If the file exists (after handling path adjustments like replacing `/src/` with `/dist/`
 * and ensuring `.js` extensions), it streams the file directly to the client.
 *
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @return {boolean} Returns `true` if the file was served, otherwise `false`.
 */
function serveFileFromNodeModules(req, res) {
  const nodeModulesPattern = /^\/node_modules\/.+/

  // Base path for `node_modules`, relative to the current project root
  const baseNodeModulesPath = path.resolve(__dirname, '../../node_modules')

  // If the request targets a node_modules file, process it
  if (nodeModulesPattern.test(req.url)) {
    // Replace `src` with `dist` in the URL
    const correctedUrl = req.url.replace('/src/', '/dist/')

    // Ensure the file extension is `.js` for the final path
    const jsFile = path.join(baseNodeModulesPath, correctedUrl.replace(/^\/node_modules\//, '').replace(/\.ts$/, '.js'))

    // Check if the file exists
    if (fs.existsSync(jsFile)) {
      // Set appropriate Content-Type
      res.setHeader('Content-Type', getContentType(jsFile))

      // Stream the file to the client
      const stream = fs.createReadStream(jsFile)
      stream.pipe(res)
      return true
    } else {
      console.warn('JS file not found:', jsFile)
    }
  }

  return false
}


/**
 * Get the Content-Type based on file extension.
 *
 * @param {string} url The request URL
 * @return {string|null} The MIME type or null if not recognized
 */
function getContentType(url) {
  if (url.endsWith('.js')) {
    return 'application/javascript'
  } else if (url.endsWith('.wasm')) {
    return 'application/wasm'
  } else if (url.endsWith('.json')) {
    return 'application/json'
  } else if (url.endsWith('.css')) {
    return 'text/css'
  } else if (url.endsWith('.html')) {
    return 'text/html'
  }
  return null
}

/**
 * Determine if a resource is cacheable.
 *
 * @param {string} url The request URL
 * @return {boolean} True if the resource should be cached
 */
function isCacheable(url) {
  return /\.(js|css|wasm|png|jpg|jpeg|gif|svg|ico)$/.test(url)
}

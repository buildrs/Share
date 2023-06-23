export const supportedTypes = ['ifc', 'obj']


const fileTypeRegex = new RegExp(/(?:ifc|obj)/i)


/**
 * @param {string} ext
 * @return {boolean} Is supported
 */
export function isExtensionSupported(ext) {
  return ext.match(fileTypeRegex)
}


/**
 * @param {string} strWithSuffix
 * @return {boolean} Is supported
 */
export function pathSuffixSupported(pathWithSuffix) {
  const lastDotNdx = pathWithSuffix.lastIndexOf('.')
  if (lastDotNdx === -1) {
    return false
  }
  return isExtensionSupported(pathWithSuffix.substring(lastDotNdx + 1))
}


/**
 * @param {string} filepath
 * @return {Array.<Array.<string>>}
 */
export function splitAroundExtension(filepath) {
  const splitRegex = /\.(?:ifc|obj)/i
  const match = fileTypeRegex.exec(filepath)
  if (!match) {
    throw new FilenameParseError('Filepath must contain ".(ifc|obj)" (case-insensitive)')
  }
  const parts = filepath.split(splitRegex)
  return {parts, match}
}


/** Custom error for better catch in UI. */
export class FilenameParseError extends Error {
  /** @param {string} msg */
  constructor(msg) {
    super(msg)
    this.name = 'FilenameParseError'
  }
}

// TOOD: Fix: @pablo-mayrgundter/cookies.js


/**
 * @param {string} name Name of the cookie
 * @return {boolean} True iff the cookie is set
 */
export function isCookieSet(name) {
  const cookie = getCookie(name)
  if (cookie && (typeof cookie == 'string')) {
    return true
  }
  return false
}


/**
 * @param {string} name Name of the cookie
 * @return {string} The cookie
 */
export function getCookie(name) {
  const namePrefix = name + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(namePrefix) == 0) {
      return c.substring(namePrefix.length, c.length)
    }
  }
  return ''
}


/**
 * @param {string} name Name of the cookie
 * @param {string} value Value of the cookie
 * @param {Number} exdays Number of days cookie should last
 */
export function setCookie(name, value, exdays=1) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString()
  document.cookie = `${name}=${value};${expires};path=/`
}

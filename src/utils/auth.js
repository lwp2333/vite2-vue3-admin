const accessTokenKey = 'accessToken'
const refreshTokenKey = 'refreshToken'

export function getAccessToken() {
  return window.localStorage.getItem(accessTokenKey) || null
}

export function setAccessToken(token = '') {
  window.localStorage.setItem(accessTokenKey, token)
}

export function getRefreshToken() {
  return window.localStorage.getItem(refreshTokenKey) || null
}

export function setRefreshToken(token = '') {
  window.localStorage.setItem(refreshTokenKey, token)
}

export function removeAllToken() {
  window.localStorage.removeItem(accessTokenKey)
  window.localStorage.removeItem(refreshTokenKey)
}

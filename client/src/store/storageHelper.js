export const STORAGE_KEY = 'edu'
export const TOKEN_KEY = 'auth_token'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}
const storage = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
// console.log(storage.user || {})
export const user = storage.user || {}
export const course = storage.course || {}
export const token = window.localStorage.getItem(`${TOKEN_KEY}`)

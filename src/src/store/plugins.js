import { STORAGE_KEY, TOKEN_KEY } from './storageHelper'
import * as types from './mutation-types'
// import createLogger from '../../../src/plugins/logger'

const localStoragePlugin = store => {
  store.subscribe((mutation, datas) => {
    let syncData = {...datas}
    if (mutation.type === types.LOGOUT_USER) {
      syncData.user = {}
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(syncData))
    window.localStorage.setItem(`${TOKEN_KEY}`, datas.token)
  })
}

export default [localStoragePlugin]

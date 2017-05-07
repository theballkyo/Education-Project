import store from '@/store/'
export const auth = (to, from, next) => {
  // Todo.
  // console.log(store.state.user.loginStatus)
  if (!store.state.user.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
}

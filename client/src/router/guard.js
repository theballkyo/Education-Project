import store from '@/store/'

const auth = (to, from, next) => {
  if (!store.state.user) {
    next('/login')
  } else {
    next()
  }
}

const canManage = async (to, from, next) => {
  const user = store.state.user
  if (!user.isLoggedIn) {
    next('/login')
    return
  }

  if (user.profile.role !== 'admin') {
    next('/login')
    return
  }

  next()
}

export default {
  auth,
  canManage
}

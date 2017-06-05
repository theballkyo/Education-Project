import Vue from 'vue'
import Router from 'vue-router'
import MainV1 from '@/components/layouts/MainV1'
import Home from '@/components/Home'
import Course from '@/components/course/Course'
import CourseDetail from '@/components/course/CourseDetail'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import User from '@/components/User'
import UserHome from '@/components/UserHome'
import SearchResult from '@/components/SearchResult'
import ReviewReport from '@/components/review/Report'
import CourseCreate from '@/components/backend/course/Create'
import CourseEdit from '@/components/backend/course/Edit'
import CourseList from '@/components/backend/course/List'
import Backend from '@/components/backend/Backend'
import BackendHome from '@/components/backend/Home'
import jwtDecode from 'jwt-decode'

import store from '@/store/'
import guard from './guard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainV1,
      props: true,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        // Backend section
        {
          path: '/backend',
          component: Backend,
          beforeEnter: guard.canManage,
          children: [
            {
              path: '',
              component: BackendHome
            },
            {
              name: 'backend/course/list',
              path: 'course/list',
              component: CourseList
            },
            {
              path: 'course/create',
              component: CourseCreate
            },
            {
              path: 'course/edit/:id',
              component: CourseEdit,
              props: true
            }
          ]
        },
        {
          path: '/report/review/:id',
          name: 'reviewReport',
          component: ReviewReport,
          props: true
        }
      ]
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/course',
      name: 'Course',
      component: Course
      // beforeEnter: guard.auth
    },
    {
      path: '/search',
      name: 'SearchResult',
      component: SearchResult
    },
    {
      path: '/course/:id',
      name: 'CourseDetail',
      component: CourseDetail,
      props: true
    },
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          path: '',
          component: UserHome
        },
        {
          path: '/user/:id/course',
          name: 'UserTeachCourse',
          component: Course
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  // console.log(store)
  if (store.getters['user/isLoggedIn']) {
    const decoded = jwtDecode(store.getters['user/getToken'])
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      // Todo refresh Token
      // But now, logout a user
      store.dispatch('user/logoutRequest')
      // console.log(store)
    }
  }
  next()
  // transition.next()
})

export default router

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

// import * as guard from './guard'

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
  next()
  // transition.next()
})

export default router

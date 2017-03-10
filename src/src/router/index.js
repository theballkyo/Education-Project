import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Course from '@/components/course/Course'
import CourseDetail from '@/components/CourseDetail'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import User from '@/components/User'
import UserHome from '@/components/UserHome'
import * as guard from './guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/course',
      name: 'Course',
      component: Course,
      beforeEnter: guard.auth
    },
    {
      path: '/course/:id',
      name: 'CourseDetail',
      component: CourseDetail
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


'use strict';

const auth = require('./common/Auth.js');

module.exports = {
  '/login': {
    post: {
      controller: 'UserController',
      method: 'login',
    },
  },
  '/register': {
    post: {
      controller: 'UserController',
      method: 'register',
    },
  },
  '/login/social': {
    post: {
      controller: 'UserController',
      middleware: [auth()],
      method: 'registerSocialUser',
    },
  },
  '/forgot-password': {
    post: {
      controller: 'UserController',
      method: 'forgotPassword',
    },
  },
  '/reset-password': {
    post: {
      controller: 'UserController',
      middleware: [auth()],
      method: 'resetPassword'
    },
  },
  '/course': {
    get: {
      controller: 'CourseController',
      method: 'getCourses'
    }
  },
  '/course/level': {
    get: {
      controller: 'CourseController',
      method: 'getAllLevel'
    }
  },
  '/course/:id': {
    get: {
      controller: 'CourseController',
      method: 'getSingle'
    },
    put: {
      controller: 'CourseController',
      method: 'updateSingle',
      middleware: [auth()],
    },
    delete: {
      controller: 'CourseController',
      method: 'deleteSingle',
      middleware: [auth()],
    }
  },
  '/course/create': {
    post: {
      controller: 'CourseController',
      method: 'create',
      middleware: [auth()],
    }
  },
  '/coursesearch': {
    get: {
      controller: 'CourseController',
      method: 'searchCourse'
    }
  },
  '/institute/list': {
    get: {
      controller: 'InstituteController',
      method: 'getList'
    }
  },
  '/institute/:id': {
    get: {
      controller: 'InstituteController',
      method: 'getSingle'
    },
    put: {
      controller: 'InstituteController',
      method: 'update',
      middleware: [auth()],
    },
    delete: {
      controller: 'InstituteController',
      method: 'deleteSingle',
      middleware: [auth()],
    }
  },
  '/institute/create': {
    post: {
      controller: 'InstituteController',
      method: 'create',
      middleware: [auth()],
    }
  },
  '/review/create/:courseid': {
    post: {
      controller: 'ReviewController',
      method: 'createSingle',
      middleware: [auth()],
    }
  },
  '/review/:id': {
    get: {
      controller: 'ReviewController',
      method: 'getSingle',
    },
    put: {
      controller: 'ReviewController',
      method: 'updateSingle',
      middleware: [auth()],
    },
    delete: {
      controller: 'ReviewController',
      method: 'deleteSingle',
      middleware: [auth()],
    }
  },
  '/reviews/:courseid': {
    get: {
      controller: 'ReviewController',
      method: 'getReviewByCourse',
    }
  }

  // '/login/social': {
  //     post: {
  //         controller: 'UserController',
  //         middleware: [auth()],
  //         method: 'registerSocialUser',
  //     },
  // }
};

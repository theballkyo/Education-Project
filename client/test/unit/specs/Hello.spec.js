import Vue from 'vue'
import Hello from '@/components/Hello'
// // import Login from '@/components/auth/Login'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})

// describe('Login.vue', () => {
//   it('should login correct', () => {
//     const Constructor = Vue.extend(Login)
//     const vm = new Constructor().$mount()
//   })
// })

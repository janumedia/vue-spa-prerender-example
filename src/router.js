import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      // should put as priority route
      path: '/404',
      name: '404',
      meta: { layout: 'no-nav' },
      props: true,
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "404" */ './views/404.vue')
    },
    {
      path: '/:category/:id',
      name: 'category-id',
      component: () => import(/* webpackChunkName: "page" */ './views/_category/_id.vue')
    },
    {
      path: '/:category',
      name: 'category',
      component: () => import(/* webpackChunkName: "page" */ './views/_category/_id.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      meta: { layout: 'no-nav' },
      component: () => import(/* webpackChunkName: "404" */ './views/404.vue')
    }
  ]
})

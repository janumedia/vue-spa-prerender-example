import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import DefaultLayout from './layouts/default.vue'
import NoNavigationLayout from './layouts/no-navigation.vue'

Vue.config.productionTip = false

//register layouts
Vue.component('default-layout', DefaultLayout);
Vue.component('no-nav-layout', NoNavigationLayout);

//register async components
Vue.component("chess-grid", () => import(/* webpackChunkName: "chess-grid" */ '@/components/list/chess-grid'));
Vue.component("tiles-grid", () => import(/* webpackChunkName: "tiles-grid" */ '@/components/list/tiles-grid'));
Vue.component("list-box", () => import(/* webpackChunkName: "list-box" */ '@/components/list/list-box'));
Vue.component("slide-images", () => import(/* webpackChunkName: "slide-images" */ '@/components/list/slide-images'));
Vue.component("google-map", () => import(/* webpackChunkName: "google-map" */ '@/components/vendor/google-map'));
Vue.component("google-review", () => import(/* webpackChunkName: "google-review" */ '@/components/vendor/google-review'));


router.onError(e => {
  console.error('onRouteError', e);
  let params = e.response ? {statusCode: e.response.status, message: e.response.statusText} : {message: e.message};
  router.replace({
    name:"404", 
    params
  });
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

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

router.onError(e => {
  //console.error('onRouteError', e);
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

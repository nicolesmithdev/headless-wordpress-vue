import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './router.js';
import store from './store';
import App from './App.vue';
import vuetify from './plugins/vuetify'

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:8888/wp-json';

Vue.component('BaseSpinner', () => import('./components/UI/BaseSpinner.vue'));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueMoment from 'vue-moment';
import Vuelidate from 'vuelidate'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import JsonExcel from 'vue-json-excel'
import router from './router';

Vue.config.productionTip = false

// for converting file size to kb
Vue.filter('kb', val => {
  return Math.floor(val / 1024);
});

Vue.use(Vuelidate)
Vue.use(VueResource);
Vue.use(VueMoment);
Vue.component('downloadExcel', JsonExcel)
new Vue({
  vuetify,
  render: h => h(App),
  router
}).$mount('#app')


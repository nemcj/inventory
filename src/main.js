import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as xlsx from '../node_modules/xlsx/dist/xlsx.full.min.js'

Vue.config.productionTip = false;


new Vue({
  router,
  xlsx,
  render: h => h(App)
}).$mount('#app')
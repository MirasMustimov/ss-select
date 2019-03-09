import Vue from 'vue'
import App from './Storm.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

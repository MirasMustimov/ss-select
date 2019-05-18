import Vue from 'vue'
import Select from './examples/Basic.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Select)
}).$mount('#app')

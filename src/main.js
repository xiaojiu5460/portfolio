import Vue from 'vue'
import App from './App.vue'
import VueResource from "vue-resource";
Vue.use(VueResource);
Vue.config.productionTip = true

new Vue({
    render: h => h(App)
}).$mount('#app')
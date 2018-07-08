import Vue from 'vue'
import App from './App.vue'
import VueResource from "vue-resource";
import './assets/css/iconfont/iconfont.css'
Vue.use(VueResource);
Vue.config.productionTip = true

new Vue({
    render: h => h(App)
}).$mount('#app')
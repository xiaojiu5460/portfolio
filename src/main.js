import Vue from 'vue'
import App from './App.vue'
import VueResource from "vue-resource";
import VueRouter from 'vue-router';
import routes from './routes'
import './assets/css/iconfont/iconfont.css'
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.config.productionTip = true

const router = new VueRouter({
    // mode: 'history',
    routes
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
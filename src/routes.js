import Home from './pages/Home.vue'
// import Header from './components/Header.vue'
// import GroupManage from './components/GroupManage.vue'
import StockDetail from './pages/StockDetail.vue'


const routes = [
    {
        path: '/',
        component: Home,
    },
    // {
    //     path: '/GroupManage',
    //     name: 'GroupManage',
    //     component: GroupManage
    // },
    {
        path: '/detail',
        name: 'StockDetail',
        component: StockDetail
    },
];
export default routes;


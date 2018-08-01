import Home from './pages/Home.vue'
import NewsDetail from './components/main-data/NewsDetail.vue'
// import GroupManage from './components/GroupManage.vue'
import StockDetail from './pages/StockDetail.vue'
import Search from './components/Search.vue'


const routes = [{
        path: '/',
        component: Home,
    },
    {
        path: '/NewsDetail',
        name: 'NewsDetail',
        component: NewsDetail
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/detail',
        name: 'StockDetail',
        component: StockDetail
    },
];
export default routes;
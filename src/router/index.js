import Vue from 'vue'
import VueRouter from 'vue-router'
import MarvelRoutes from '../modules/dashboard/Routes'
Vue.use(VueRouter);

let routes = [];

routes = routes.concat(MarvelRoutes);

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router

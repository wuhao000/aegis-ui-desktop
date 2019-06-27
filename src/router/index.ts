import Vue from 'vue';
import Router, {RouteConfig} from 'vue-router';
import site from './site';

Vue.use(Router);

export const routes = [
  site,
  {
    name: 'Home',
    path: '/',
    redirect: '/install'
  }
] as RouteConfig[];

export default new Router({
  base: process.env.BASE_URL,
  routes,
  mode: 'history'
});

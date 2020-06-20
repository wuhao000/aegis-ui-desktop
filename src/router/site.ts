import desktopComponent from '@/router/desktop-component';
import directive from '@/router/directive';
import generalComponent from '@/router/general-component';
import mobileComponent from '@/router/mobile-component';
import tool from '@/router/tool';
import Home from '@/views/home.vue';
import Site from '../views/site.vue';

export default {
  path: '/',
  name: 'site',
  component: Site,
  children: [
    {
      path: 'install',
      name: '安装',
      component: Home
    },
    {
      path: 'develop',
      name: '开发',
      component: () => import('@/views/develop.vue')
    },
    {
      path: 'change-log',
      name: '更新日志',
      component: () => import('@/views/change-log.vue')
    },
    {
      path: '/general-components',
      name: '通用组件',
      component: () => import('@/components/components.vue'),
      children: generalComponent
    },
    {
      path: '/desktop-components',
      name: '桌面组件',
      component: () => import('@/components/components.vue'),
      children: desktopComponent
    },
    {
      path: '/tools',
      name: '工具',
      component: () => import('@/components/components.vue'),
      children: tool
    },
    {
      path: '/directives',
      name: '指令',
      component: () => import('@/components/components.vue'),
      children: directive
    },
  ]
};

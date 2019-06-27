import {RouteConfig} from 'vue-router';

export default [{
  path: 'codemirror-directive',
  name: 'CodemirrorDirective 代码展示',
  component: () => import('@/generated/codemirror-directive/index.vue')
}, {
  path: 'time-directive',
  name: 'TimeDirective 时间展示',
  component: () => import('@/generated/time-directive/index.vue')
}] as RouteConfig[];

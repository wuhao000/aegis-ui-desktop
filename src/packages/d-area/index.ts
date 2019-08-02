import Area from './src/index.vue';

(Area as any).install = (Vue) => {
  Vue.component('DArea', Area);
};

export default Area;

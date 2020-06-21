import Icon from './src/index.vue';

const Plugin: any = Icon;
Plugin.install = (Vue) => {
  Vue.component('AeIcon', Icon);
  Vue.component('DIcon', Icon);
};

export default Plugin;

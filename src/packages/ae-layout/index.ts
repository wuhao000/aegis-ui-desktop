import Layout from './src';
import './style';

export default {
  install(Vue) {
    Vue.component('AeLayout', Layout);
    Vue.component('AeLayoutHeader', Layout.Header);
    Vue.component('AeLayoutContent', Layout.Content);
    Vue.component('AeLayoutFooter', Layout.Footer);
    Vue.component('AeLayoutSider', Layout.Sider);
    Vue.component('DLayout', Layout);
    Vue.component('DLayoutHeader', Layout.Header);
    Vue.component('DLayoutContent', Layout.Content);
    Vue.component('DLayoutFooter', Layout.Footer);
    Vue.component('DLayoutSider', Layout.Sider);
  }
};

import ToolTip from './src';

export default {
  install(Vue) {
    Vue.component('AeTooltip', ToolTip);
    Vue.component('DTooltip', ToolTip);
  }
};

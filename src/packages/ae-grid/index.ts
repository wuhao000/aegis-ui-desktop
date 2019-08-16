import './style';

export default {
  install(Vue) {
    Vue.component('AeRow', window.antd.Row);
    Vue.component('AeCol', window.antd.Col);
    Vue.component('DRow', window.antd.Row);
    Vue.component('DCol', window.antd.Col);
  }
};

export const Col = window.antd.Col;
export const Row = window.antd.Row;

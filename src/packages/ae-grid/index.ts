import {Col as ACol, Row as ARow} from '../antd';
import './style';

export default {
  install(Vue) {
    Vue.component('AeRow', ARow);
    Vue.component('AeCol', ACol);
    Vue.component('DRow', ARow);
    Vue.component('DCol', ACol);
  }
};

export const Col = ACol;
export const Row = ARow as any;

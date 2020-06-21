import Button from './src/button';
import Group from './src/group.vue';
import './style';

import {Checkbox} from '../antd';

// @ts-ignore
Checkbox.Button = Button;
export default {
  install: Vue => {
    Vue.component('DCheckbox', Checkbox);
    Vue.component('DCheckboxGroup', Group);
    Vue.component('DCheckboxButton', Button);
  }
};

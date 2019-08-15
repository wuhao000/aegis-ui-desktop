import Select from './src';
import './style';

Select.install = (Vue) => {
  Vue.component('DSelect', Select);
  Vue.component('DSelectOption', Select.Option);
  Vue.component('DSelectOptionGroup', Select.OptionGroup);
};

export default Select;

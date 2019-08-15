// based on vc-select 8.7.0
import ProxySelect, { Select } from './Select';
import Option from 'ant-design-vue/es/vc-select/Option';
import { SelectPropTypes } from 'ant-design-vue/es/vc-select/PropTypes';
import OptGroup from 'ant-design-vue/es/vc-select/OptGroup';
Select.Option = Option;
Select.OptGroup = OptGroup;
ProxySelect.Option = Option;
ProxySelect.OptGroup = OptGroup;
export { Select, Option, OptGroup, SelectPropTypes };
export default ProxySelect;

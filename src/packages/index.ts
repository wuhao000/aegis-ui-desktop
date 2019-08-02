// 导入颜色选择器组件
import Global from './global';
import HttpMethod from './http-method';
import VueIcon from '@ant-design/icons-vue';
import zhCn from './moment-zh_CN';
import AeCodemirror from './ae-codemirror';
import AeGrid from './ae-grid';
import AeIcon from './ae-icon';
import AeLayout from './ae-layout';
import AeModal from './ae-modal';
import AeTooltip from './ae-tooltip';
import ApiProxy from './api-proxy';
import CodemirrorDirective from './codemirror-directive';
import DAnchor from './d-anchor';
import DAutoComplete from './d-auto-complete';
import DButton from './d-button';
import DCalendar from './d-calendar';
import DCard from './d-card';
import DCascader from './d-cascader';
import DCheckbox from './d-checkbox';
import DColorPicker from './d-color-picker';
import DDatePicker from './d-date-picker';
import DDescriptionList from './d-description-list';
import DDivider from './d-divider';
import DEmpty from './d-empty';
import DForm from './d-form';
import DInput from './d-input';
import DInputNumber from './d-input-number';
import DList from './d-list';
import DMenu from './d-menu';
import DMessage from './d-message';
import DPagination from './d-pagination';
import DPopover from './d-popover';
import DArea from './d-area';
import DRadio from './d-radio';
import DRate from './d-rate';
import DSelect from './d-select';
import DSlider from './d-slider';
import DSwitch from './d-switch';
import DTable from './d-table';
import DTag from './d-tag';
import DTimePicker from './d-time-picker';
import DTransfer from './d-transfer';
import DTree from './d-tree';
import DUpload from './d-upload';
import DYearPicker from './d-year-picker';
import TimeDirective from './time-directive';
// 注册moment中文国际化文案
if (moment) {
  moment.updateLocale('zh-cn', zhCn);
}
if (window.AntDesignIcons) {
  // 注册 ant design icons, 共721个icon
  const icons = window.AntDesignIcons;
  Object.keys(icons).forEach(icon => {
    VueIcon.add(icons[icon]);
  });
}
// 存储组件列表
const components = [
  AeCodemirror,
	AeGrid,
	AeIcon,
	AeLayout,
	AeModal,
	AeTooltip,
	CodemirrorDirective,
	DAnchor,
	DAutoComplete,
	DButton,
	DCalendar,
	DCard,
	DCascader,
	DCheckbox,
	DColorPicker,
	DDatePicker,
	DDescriptionList,
	DDivider,
	DEmpty,
	DForm,
	DInput,
	DInputNumber,
	DList,
	DMenu,
	DMessage,
	DPagination,
	DPopover,
	DArea,
	DRadio,
	DRate,
	DSelect,
	DSlider,
	DSwitch,
	DTable,
	DTag,
	DTimePicker,
	DTransfer,
	DTree,
	DUpload,
	DYearPicker,
	TimeDirective
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否可以安装
  // if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.use(component));
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
   install(window.Vue);
}
export {
  // 以下是具体的组件列表
  Global,
  HttpMethod,
  AeCodemirror,
	AeGrid,
	AeIcon,
	AeLayout,
	AeModal,
	AeTooltip,
	ApiProxy,
	CodemirrorDirective,
	DAnchor,
	DAutoComplete,
	DButton,
	DCalendar,
	DCard,
	DCascader,
	DCheckbox,
	DColorPicker,
	DDatePicker,
	DDescriptionList,
	DDivider,
	DEmpty,
	DForm,
	DInput,
	DInputNumber,
	DList,
	DMenu,
	DMessage,
	DPagination,
	DPopover,
	DArea,
	DRadio,
	DRate,
	DSelect,
	DSlider,
	DSwitch,
	DTable,
	DTag,
	DTimePicker,
	DTransfer,
	DTree,
	DUpload,
	DYearPicker,
	TimeDirective
};
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  Global,
  HttpMethod,
  AeCodemirror,
	AeGrid,
	AeIcon,
	AeLayout,
	AeModal,
	AeTooltip,
	ApiProxy,
	CodemirrorDirective,
	DAnchor,
	DAutoComplete,
	DButton,
	DCalendar,
	DCard,
	DCascader,
	DCheckbox,
	DColorPicker,
	DDatePicker,
	DDescriptionList,
	DDivider,
	DEmpty,
	DForm,
	DInput,
	DInputNumber,
	DList,
	DMenu,
	DMessage,
	DPagination,
	DPopover,
	DArea,
	DRadio,
	DRate,
	DSelect,
	DSlider,
	DSwitch,
	DTable,
	DTag,
	DTimePicker,
	DTransfer,
	DTree,
	DUpload,
	DYearPicker,
	TimeDirective
};

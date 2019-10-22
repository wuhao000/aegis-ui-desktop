// 导入颜色选择器组件
import ApiProxy from './api-proxy';
import Global from './global';
import HttpMethod from './http-method';

export {
  // 以下是具体的组件列表
  Global,
  HttpMethod,
  ApiProxy
};
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  Global,
  HttpMethod,
  ApiProxy
};

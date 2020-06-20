import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import localeProvider from '../../locale-provider/zh_CN';
import BaseFormComponent from '../../../mixins/base-input-component';

import {TimePicker} from 'ant-design-vue';

@Component({
  name: 'DTimePicker',
  inheritAttrs: false
})
export default class DTimePicker extends BaseFormComponent {

  @Prop({type: Object, default: () => localeProvider.TimePicker})
  public locale: object;
  public static install: (Vue) => void;
  @Prop({type: String, default: '请选择时间'})
  public placeholder: string;

  public getInputComponent() {
    return TimePicker;
  }

}

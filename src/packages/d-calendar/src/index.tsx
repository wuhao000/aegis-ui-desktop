import {Calendar} from 'ant-design-vue';
import Component from 'vue-class-component';
import BaseFormComponent from '../../../mixins/base-input-component';


@Component({
  name: 'DCalendar',
  inheritAttrs: false
})
export default class DCalendar extends BaseFormComponent {

  public static install: (Vue) => void;

  public getInputComponent() {
    return Calendar;
  }

}

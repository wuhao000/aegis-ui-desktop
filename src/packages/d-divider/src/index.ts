import {Divider} from 'ant-design-vue';
import ProxyComponent from '../../../mixins/proxy-component';
import Component from 'vue-class-component';


@Component({
  name: 'DDivider',
  inheritAttrs: false
})
export default class DDivider extends ProxyComponent {

  public static install: (Vue) => void;

  public getInputComponent() {
    return Divider;
  }

}

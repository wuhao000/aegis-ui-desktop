import {Tooltip} from 'ant-design-vue';
import Component from 'vue-class-component';
import ProxyComponent from '../../../mixins/proxy-component';


@Component({
  name: 'DTooltip',
  inheritAttrs: false
})
export default class DTooltip extends ProxyComponent {

  public static install: (Vue) => void;

  public getInputComponent() {
    return Tooltip;
  }

}

import {Card} from 'ant-design-vue';
import ProxyComponent from '../../../mixins/proxy-component';
import Component from 'vue-class-component';


@Component({
  name: 'DCard',
  inheritAttrs: false
})
export default class DCard extends ProxyComponent {

  public static install: (Vue) => void;

  public getInputComponent() {
    return Card;
  }

}

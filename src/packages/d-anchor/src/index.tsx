import {Anchor} from '../../antd';
import Component from 'vue-class-component';
import ProxyComponent from '../../../mixins/proxy-component';


@Component({
  name: 'DAnchor',
  inheritAttrs: false
})
export default class DAnchor extends ProxyComponent {

  public static install: (Vue) => void;
  public static Link = Anchor.Link;

  public getInputComponent() {
    return Anchor;
  }

}

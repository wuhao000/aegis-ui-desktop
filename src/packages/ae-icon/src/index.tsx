import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import ProxyComponent from '../../../mixins/proxy-component';

const fonts = {
  xs: 12, sm: 14, md: 16, lg: 24, xl: 32, xxl: 48
};
@Component({
  name: 'AeIcon'
})
export default class AeIcon extends ProxyComponent {

  @Prop(String)
  public type: string;
  @Prop({type: [String, Number], default: ''})
  public size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number;
  @Prop({type: String})
  public color: string;

  get cssStyle() {

    const style: any = {
      fontSize: typeof this.size === 'number' ? `${this.size}px` : (this.size ? `${fonts[this.size]}px` : 'inherit')
    };
    if (this.color) {
      style.color = this.color;
    }
    return style;
  }

  public getInputComponent(): {} {
    return window.antd.Icon;
  }
}

import Component from 'vue-class-component';
import {mixins} from 'vue-class-component/lib/util';
import {Prop} from 'vue-property-decorator';
import OptionsBasedComponent from '../../../mixins/options-based-component';
import { Radio } from '../../antd';


@Component({
  name: 'DRadioGroup'
})
export default class DRadioGroup extends mixins(OptionsBasedComponent) {

  @Prop({type: Boolean, default: false})
  public button: boolean;

  get optionList() {
    return this.getOptions();
  }

  public renderOption(option) {
    if (this.button) {
      // @ts-ignore
      return (<Radio.Button disabled={this.isDisabled}
          size={this.componentSize}
          key={option.value}
          readOnly={this.isReadonly}
          value={option.value}>{option.label}</Radio.Button>
      );
    } else {
      // @ts-ignore
      return (<Radio disabled={this.isDisabled}
        key={option.value}
        readOnly={this.isReadonly}
        value={option.value}>{option.label}
      </Radio>);
    }
  }

  public render() {
    const props = this.props;
    delete props.options;
    // @ts-ignore
    return <Radio.Group attrs={props}
                        value={this.stateValue}
                        on={this.listeners}>
      {
        this.options ? this.optionList.map(option => {
          return this.renderOption(option);
        }) : this.$slots.default
      }
    </Radio.Group>;

  }
}

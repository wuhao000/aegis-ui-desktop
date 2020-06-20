import Component from 'vue-class-component';
import {mixins} from 'vue-class-component/lib/util';
import {FormComponent} from './form-component';
import PureInputComponent from './pure-input-component';

@Component({
  name: 'BaseFormComponent'
})
export default class BaseFormComponent extends mixins(PureInputComponent, FormComponent) {

  get props() {
    const props = {
      ...this.$attrs,
      ...this.$props,
      ...this.getProps(),
      ...this.getSlotProps(),
      disabled: this.isDisabled,
      readOnly: this.isReadonly,
      size: this.componentSize
    };
    Object.keys(props).forEach(key => {
      if (props[key] === undefined) {
        delete props[key];
      }
    });
    return props;
  }

}

import AsyncValidator, {ValidateRule, ValidateRules} from 'async-validator';
import debounce from 'lodash.debounce';
import Vue from 'vue';
import Emitter from '../../../mixins/emitter';
import {getPropByPath, noop} from './utils';

const Form = window.antd.Form;

export default Vue.extend({
  name: 'DFormItem',
  mixins: [Emitter],
  componentName: 'ElFormItem',
  props: {
    hasFeedback: {type: Boolean, default: false},
    prop: {type: String, default: ''},
    labelWidth: {type: [String, Number]},
    value: {},
    required: {type: Boolean, default: false},
    rules: {type: [Object, Array]},
    label: {type: String, default: ''}
  },
  inject: ['form'],
  provide() {
    return {
      formItem: this
    };
  },
  data(): any {
    return {
      validateStatus: '',
      help: '',
      validateDisabled: true,
      control: null
    };
  },
  computed: {
    fieldValue(this: any) {
      if (this.value !== null && this.value !== undefined) {
        return this.value;
      }
      const model = this.form && this.form.model;
      if (!model || !this.prop) {
        return;
      }

      let path = this.prop;
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }
      return getPropByPath(model, path, true).v;
    },
    isRequired(this: any) {
      if (this.required) {
        return this.required;
      } else {
        return this.getRules().some(it => it.required);
      }
    },
    labelCol(this: any) {
      let labelCol: any = {};
      if (this.$attrs['label-col']) {
        labelCol = this.$attrs['label-col'];
      }
      if (this.form && this.form.labelCols) {
        if (typeof this.form.labelCols === 'number') {
          labelCol.span = this.form.labelCols;
        } else {
          labelCol = this.form.labelCols;
        }
      }
      labelCol.style = this.labelStyle;
      return labelCol;
    },
    labelStyle(this: any) {
      const labelWidth = this.labelWidth ? this.labelWidth : (this.form && this.form.labelWidth);
      const style: any = {};
      if (labelWidth) {
        style.width = typeof labelWidth === 'number' ? (labelWidth + 'px') : labelWidth;
        style.float = 'left';
      }
      return style;
    },
    wrapperCol(this: any) {
      let wrapperCol: any = {};
      if (this.$attrs['wrapper-col']) {
        wrapperCol = this.$attrs['wrapper-col'];
      }
      if (this.form && this.form.wrapperCols) {
        if (typeof this.form.wrapperCols === 'number') {
          wrapperCol.span = this.form.wrapperCols;
        } else {
          wrapperCol = this.form.wrapperCols;
        }
      } else if (this.form && this.form.labelCols) {
        if (typeof this.form.labelCols === 'number') {
          wrapperCol.span = 24 - this.form.labelCols;
        }
      }
      wrapperCol.style = this.wrapperStyle;
      return wrapperCol;
    },
    wrapperStyle(this: any) {
      const labelWidth = this.labelWidth ? this.labelWidth : (this.form && this.form.labelWidth);
      const style: any = {};
      if (labelWidth) {
        style.marginLeft = typeof labelWidth === 'number' ? (labelWidth + 'px') : labelWidth;
      }
      return style;
    }
  },
  beforeDestroy(this: any) {
    if (this.prop) {
      this.dispatch('DForm', 'd.form.removeField', [this]);
    }
  },
  created(this: any) {
    if (this.prop) {
      this.dispatch('DForm', 'd.form.addField', [this]);
      this.$on('d.form-item.setControl', (control) => {
        this.control = control;
      });
      const rules = this.getRules();
      if (rules.length || this.required !== undefined) {
        this.$on('d.form.blur', this.onFieldBlur);
        this.$on('el.form.blur', this.onFieldBlur);
        this.$on('d.form.change', this.onFieldChange);
        this.$on('el.form.change', this.onFieldChange);
      }
    }
    this.validate = debounce(this.validate, 300);
  },
  methods: {
    focus(this: any) {
      if (this.control && this.control.focus.bind(this.control).bind(this.control).bind(this.control).bind(this.control).bind(this.control)) {
        this.control.focus();
      }
    },
    getFilteredRule(this: any, trigger) {
      const rules = this.getRules();
      return rules.filter(rule => {
        if (!rule.trigger || trigger === '') {
          return true;
        }
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1;
        } else {
          return rule.trigger === trigger;
        }
      }).map(rule => Object.assign({}, rule));
    },
    getRules(this: any): ValidateRule[] {
      let formRules: ValidateRules = this.form && this.form.rules;
      const selfRules = this.rules;
      const requiredRule = this.required !== undefined ? {required: this.required} : [];
      const prop = getPropByPath(formRules, this.prop || '');
      formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : [];
      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },
    onFieldBlur(this: any) {
      this.validate('blur');
    },
    onFieldChange(this: any) {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }
      this.validate('change');
    },
    validate(this: any, trigger, callback = noop) {
      this.$nextTick(() => {
        this.validateDisabled = false;
        const rules = this.getFilteredRule(trigger);
        if ((!rules || rules.length === 0) && this.required === undefined) {
          callback();
          return true;
        }
        this.validateStatus = 'validating';
        const descriptor = {};
        if (rules && rules.length > 0) {
          rules.forEach(rule => {
            delete rule.trigger;
          });
        }
        descriptor[this.prop] = rules;
        const validator = new AsyncValidator(descriptor);
        const model = {
          [this.prop]: this.fieldValue
        };
        validator.validate(model, {firstFields: true}, (errors, invalidFields) => {
          this.validateStatus = !errors ? 'success' : 'error';
          this.help = errors ? errors[0].message : '';
          callback(this.help, invalidFields);
          this.$emit('validate', !errors, errors);
          this.form && this.form.$emit('validate', this.prop, !errors, this.help || null);
        });
      });
    }
  },
  render(this: any) {
    const props = Object.assign({}, this.$props);
    if (this.$slots.label) {
      props.label = this.$slots.label;
    }
    return <Form.Item props={props}
                      attrs={this.$attrs}
                      help={this.help}
                      labelCol={this.labelCol}
                      validateStatus={this.validateStatus}
                      wrapperCol={this.wrapperCol}>
      {this.$slots.default}
    </Form.Item>;
  }
});

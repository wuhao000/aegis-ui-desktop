import Vue from 'vue';
import Component from 'vue-class-component';
import {plugin} from 'vue-function-api';
import {Prop} from 'vue-property-decorator';
import {AeAlert, AePrompt, ModalOptions} from '../../../types/components/ae-modal';
import BaseInputComponent from '../../mixins/base-input-component';
import DButton from '../d-button';
import DForm from '../d-form';
import DInput from '../d-input';
import AeModal from './src';
import {Modal} from '../antd';
Vue.use(plugin);
const defaultConfirmOptions: ModalOptions = {
  centered: true,
  okText: '确认',
  cancelText: '取消'
};

@Component({
  name: 'PromptInput'
})
class PromptInput extends BaseInputComponent {

  @Prop({type: String})
  public value: string;
  @Prop({type: Array})
  public rules: any[];
  public currentValue = this.value || '';

  public render(this: any) {
    // @ts-ignore
    return <DForm
        props={{
          model: {inputValue: this.currentValue},
          rules: {inputValue: this.rules}
        }}>
      <DForm.Item prop={'inputValue'}>
        {
          // @ts-ignore
          <DInput onChange={(value) => {
            if (typeof value === 'string') {
              this.$emit('input', value);
            }
          }} vModel={this.currentValue}/>
        }
      </DForm.Item>
    </DForm>;
  }
}


function createPromptContent(copyOptions: {} & ModalOptions, onChange?) {
  const rules = (copyOptions.rules || []).concat(
      copyOptions.required ? [{required: true, message: '必须输入', trigger: 'change'}] : []
  );
  const h = new Vue().$createElement;
  // @ts-ignore
  return <PromptInput rules={rules}
                      onInput={(value) => {
                        if (onChange) {
                          onChange(value);
                        }
                      }}
                      value={copyOptions.inputValue}/>;
}

type Type = 'confirm' | 'alert' | 'info' | 'success' | 'error' | 'warning' | 'prompt';

function createModal(message: string | ModalOptions, title: string, icon: string, options: ModalOptions, type: Type) {
  const copyOptions: any = typeof message === 'object' ? Object.assign({}, defaultConfirmOptions, message) : (options || Object.assign({}, defaultConfirmOptions));
  if (typeof message === 'string') {
    copyOptions.content = message;
    if (title) {
      copyOptions.title = title;
    }
    if (icon) {
      copyOptions.iconType = icon;
    }
  }
  return new Promise((resolve, reject) => {
    if (!copyOptions.onOk) {
      copyOptions.onOk = (e) => {
        resolve(e);
        if (typeof e === 'function') {
          e();
        }
      };
    } else {
      const func = copyOptions.onOk;
      copyOptions.onOk = (e) => {
        resolve(e);
        func();
      };
    }
    if (!copyOptions.onCancel) {
      copyOptions.onCancel = () => {
        reject();
      };
    } else {
      const func = copyOptions.onCancel;
      copyOptions.onCancel = () => {
        reject();
        func();
      };
    }
    if (type === 'confirm') {
      copyOptions.title = copyOptions.title || '确认';
      Modal.confirm(copyOptions);
    } else if (type === 'alert') {
      copyOptions.title = copyOptions.title || '提示';
      copyOptions.okCancel = false;
      Modal.confirm(copyOptions);
    } else if (type === 'prompt') {
      copyOptions.title = copyOptions.title || '输入';
      copyOptions.content = createPromptContent(copyOptions, (value) => {
        copyOptions.inputValue = value;
      });
      copyOptions.onOk = (e) => {
        resolve(copyOptions.inputValue);
        if (typeof e === 'function') {
          e();
        }
      };
      Modal.confirm(copyOptions);
    } else if (type === 'info') {
      copyOptions.title = copyOptions.title || '信息';
      Modal.info(copyOptions);
    } else if (type === 'success') {
      copyOptions.title = copyOptions.title || '成功';
      Modal.success(copyOptions);
    } else if (type === 'error') {
      copyOptions.title = copyOptions.title || '错误';
      Modal.error(copyOptions);
    } else if (type === 'warning') {
      copyOptions.title = copyOptions.title || '警告';
      Modal.warning(copyOptions);
    }
  });
}

AeModal.install = (Vue) => {
  Vue.component('AeModal', AeModal);
  Vue.component('DModal', AeModal);
  Vue.use(DButton);
  const alert: AeAlert = (message: string | ModalOptions,
                          title?: string,
                          icon?: string,
                          options?: ModalOptions) => {
    return createModal(message, title, icon, options, 'alert');
  };
  const prompt: AePrompt = (message: string, title?: string,
                            value?: string,
                            icon?: string, options?: ModalOptions) => {
    const ops = options || {};
    if (value !== undefined) {
      ops.inputValue = value;
    }
    return createModal(message, title, icon, ops, 'prompt');

  };
  alert.info = (message: string | ModalOptions,
                title: string) => {
    return createModal(message, title, null, null, 'info');
  };
  alert.success = (message: string | ModalOptions,
                   title: string) => {
    return createModal(message, title, null, null, 'success');
  };
  alert.error = (message: string | ModalOptions,
                 title: string) => {
    return createModal(message, title, null, null, 'error');
  };
  alert.warning = (message: string | ModalOptions,
                   title: string) => {
    return createModal(message, title, null, null, 'warning');
  };
  const confirm = (message: string | ModalOptions,
                   title: string,
                   icon: string,
                   options: ModalOptions) => {
    return createModal(message, title, icon, options, 'confirm');
  };
  Vue.prototype.$dprompt = prompt;
  Vue.prototype.$dalert = alert;
  Vue.prototype.$dconfirm = confirm;
  AeModal.confirm = confirm;
  AeModal.alert = alert;
  AeModal.info = alert.info;
  AeModal.success = alert.success;
  AeModal.error = alert.error;
  AeModal.warning = alert.warning;
  AeModal.prompt = prompt;
};

export default AeModal;

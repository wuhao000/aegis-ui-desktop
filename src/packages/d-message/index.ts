import {message} from 'ant-design-vue';

// @ts-ignore
message.install = (vue) => {
  Object.defineProperties(vue.prototype, {
    $message: {
      get() {
        return message;
      }
    }
  });
};

export default message as any;

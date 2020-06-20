import {LoDashStatic} from 'lodash';
import Moment from 'moment';
import {DefaultComputed, DefaultData, DefaultMethods, DefaultProps, PropsDefinition} from 'vue/types/options';
import {Vue} from 'vue/types/vue';


export interface MessageOptions {
  /**
   * content of the message
   * @type any (string | VNode | (h) => VNode)
   */
  content: any;
  /**
   * time(seconds) before auto-dismiss, don't dismiss if set to 0
   * @default 3
   * @type number
   */
  duration?: number;
  /**
   * type of message
   * @type string
   */
  type?: 'success' | 'info' | 'warning' | 'error' | 'loading';
  /**
   * Customized Icon
   * @type any  (string | VNode | (h) => VNode)
   */
  icon?: any;
  /**
   * Specify a function that will be called when the message is closed
   * @type Function
   */
  onClose?: () => void;
}

export declare class Message {
  success(content: any, duration?: number, onClose?: () => void): Promise<any>;

  warning(content: any, duration?: number, onClose?: () => void): Promise<any>;

  warn(content: any, duration?: number, onClose?: () => void): Promise<any>;

  info(content: any, duration?: number, onClose?: () => void): Promise<any>;

  error(content: any, duration?: number, onClose?: () => void): Promise<any>;

  loading(content: any, duration?: number, onClose?: () => void): Promise<any>;

  open: (config: MessageOptions) => Promise<any>;
  config: (options: MessageConfigOptions) => void;
  destroy: () => void;
}


export interface MessageConfigOptions {
  /**
   * time before auto-dismiss, in seconds
   * @default 1.5
   * @type number
   */
  duration?: number;
  /**
   * Return the mount node for Message
   * @default () => document.body
   * @type Function
   */
  getContainer?: () => HTMLElement;
  /**
   * max message show, drop oldest if exceed limit
   * @type number
   */
  maxCount?: number;
  /**
   * distance from top
   * @default '24px'
   * @type string
   */
  top?: string;
}

declare module 'vue/types/vue' {

  interface Vue {
    // @ts-ignore
    $message: Message;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue,
      Data = DefaultData<V>,
      Methods = DefaultMethods<V>,
      Computed = DefaultComputed,
      PropsDef = PropsDefinition<DefaultProps>,
      Props = DefaultProps> {
    componentName?: string;
  }
}
declare global {
  export const moment: typeof Moment;
  export const hljs: any;
  export const _: LoDashStatic;
}

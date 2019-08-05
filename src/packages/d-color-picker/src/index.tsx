import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'DColorPicker'
})
class DColorPicker extends Vue {

  @Prop({type: String, default: 'd-color-picker'})
  public prefixCls: string;
  // 当前颜色值
  @Prop({type: String, default: '#000000'})
  public defaultColor: string;

  // 默认颜色
  @Prop({type: Boolean, default: false})
  public disabled: boolean;

  // 禁用状态
  @Prop()
  public value: any;

  // 面板打开状态
  public html5Color: string = this.value;
  // 鼠标经过的颜色块
  public bColor: string[] = [
    '#c21401',
    '#ff1e02',
    '#ffc12a',
    '#ffff3a',
    '#90cf5b',
    '#00af57',
    '#00afee',
    '#0071be',
    '#00215f',
    '#72349d'
  ];
  // 主题颜色
  public colorConfig: any = [
    ['#7f7f7f', '#f2f2f2'],
    ['#0d0d0d', '#808080'],
    ['#1c1a10', '#ddd8c3'],
    ['#0e243d', '#c6d9f0'],
    ['#233f5e', '#dae5f0'],
    ['#632623', '#f2dbdb'],
    ['#4d602c', '#eaf1de'],
    ['#3f3150', '#e6e0ec'],
    ['#1e5867', '#d9eef3'],
    ['#99490f', '#fee9da']
  ];
  // 颜色面板
  public hoverColor: any = null;
  public tColor: string[] = [
    '#000000',
    '#ffffff',
    '#eeece1',
    '#1e497b',
    '#4e81bb',
    '#e2534d',
    '#9aba60',
    '#8165a0',
    '#47acc5',
    '#f9974c'
  ];
  private showClear: boolean = false;

  // 显示面板颜色
  get colorPanel() {
    const colorArr = [];
    for (const color of this.colorConfig) {
      colorArr.push(this.gradient(color[1], color[0], 5));
    }
    return colorArr;
  }

  // 显示颜色
  get showColor() {
    if (this.value) {
      return this.value;
    } else {
      return this.defaultColor;
    }
  }

  // 颜色面板
  get showPanelColor() {
    if (this.hoverColor) {
      return this.hoverColor;
    } else {
      return this.showColor;
    }
  }

  // 更新组件的值 value
  public gradient(startColor: any, endColor: any, step: any): any {
    // 讲 hex 转换为 rgb
    const sColor = this.hexToRgb(startColor);
    const eColor = this.hexToRgb(endColor);

    // 计算R\G\B每一步的差值
    const rStep = (eColor[0] - sColor[0]) / step;
    const gStep = (eColor[1] - sColor[1]) / step;
    const bStep = (eColor[2] - sColor[2]) / step;

    const gradientColorArr = [];
    // 计算每一步的hex值
    for (let i = 0; i < step; i++) {
      gradientColorArr.push(
        this.rgbToHex(
          parseInt(rStep * i + sColor[0]),
          parseInt(gStep * i + sColor[1]),
          parseInt(bStep * i + sColor[2])
        )
      );
    }
    return gradientColorArr;
  }

  // 设置默认颜色
  public handleDefaultColor() {
    this.updataValue(this.defaultColor);
  }

  // 格式化 hex 颜色值
  public hexToRgb(hex: any) {
    const copyHex = this.parseColor(hex);
    const rgb = [];
    for (let i = 1; i < 7; i += 2) {
      rgb.push(parseInt('0x' + copyHex.slice(i, i + 2)));
    }
    return rgb;
  }

  // RGB 颜色 转 HEX 颜色
  public parseColor(hexStr: any) {
    if (hexStr.length === 4) {
      return '#' +
        hexStr[1] +
        hexStr[1] +
        hexStr[2] +
        hexStr[2] +
        hexStr[3] +
        hexStr[3];
    } else {
      return hexStr;
    }
  }

  // HEX 转 RGB 颜色
  public rgbToHex(r: any, g: any, b: any): any {
    const hex = ((r << 16) | (g << 8) | b).toString(16);
    return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
  }

  // 计算渐变过渡颜色
  public triggerHtml5Color() {
    (this.$refs['html5Color'] as any).click();
  }

  public updataValue(value: any) {
    this.$emit('input', value);
    this.$emit('change', value);
  }

  public render() {
    const {prefixCls} = this;
    return <a-dropdown class={prefixCls}
                       trigger={['click']}>
      <div class="ant-select ant-select-enabled ant-dropdown-trigger d-color-picker">
        <div tabindex="0"
             class="ant-select-selection ant-select-selection--single">
          <div class="ant-select-selection__rendered">
            {
              this.value ? <div class={classNames('color-btn', {disabled: this.disabled})}
                                style={{
                                  'background-color': this.showColor
                                }}
              /> : <div unselectable="on" class="ant-select-selection__placeholder"
                        style="display: block; user-select: none;">请选择
              </div>
            }
          </div>
          <span unselectable="on" class="ant-select-arrow"
                style="user-select: none;"
                onMouseover={() => {
                  this.showClear = true;
                }}
                onMouseleave={() => {
                  this.showClear = false;
                }}>
            {
              this.showClear ? <ae-icon type="close-circle"
                                        theme="filled"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          this.updataValue(null);
                                        }}/> : <ae-icon type="down"/>
            }
          </span>
        </div>
      </div>
      <div class="d-color-picker ant-select"
           ref="colorPicker"
           onClick={(event) => {
             event.stopPropagation();
           }}>
      </div>
      <div slot="overlay"
           class={classNames(`${prefixCls}-dropdown`)}>
        <div class="hd">
          <div class="colorView"
               style={{backgroundColor: this.showPanelColor}}/>
          <d-button onClick={this.handleDefaultColor}
                    onMouseout={() => {
                      this.hoverColor = null;
                    }}
                    onMouseover={() => {
                      this.hoverColor = this.defaultColor;
                    }}
          >默认颜色
          </d-button>
        </div>
        <div class="bd">
          <h3>主题颜色</h3>
          <ul class="tColor">
            {this.createColorCubes(this.tColor)}
          </ul>
          <ul class="bColor">
            {
              this.colorPanel.map((item, index) => {
                return <li key={index}>
                  <ul>
                    {
                      this.createColorCubes(item)
                    }
                  </ul>
                </li>;
              })
            }
          </ul>
          <h3>标准颜色</h3>
          <ul class="tColor">
            {this.createColorCubes(this.bColor)}
          </ul>
        </div>
      </div>
    </a-dropdown>;
  }

  private createColorCubes(item: any) {
    return item.map((color, cindex) => {
      return <d-button style={{backgroundColor: color}}
                       class="color-cubte"
                       key={cindex}
                       onClick={() => {
                         this.updataValue(color);
                       }}
                       onMouseout={() => {
                         this.hoverColor = null;
                       }}
                       onMouseover={() => {
                         this.hoverColor = color;
                       }}/>;
    });
  }
}

export default DColorPicker;

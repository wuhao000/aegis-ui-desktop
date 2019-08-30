<template>
  <d-select v-model="currentValue"
            class="d-year-picker"
            ref="select"
            :clearable="clearable"
            :dropdown-match-select-width="false"
            :multiple="multiple"
            :placeholder="placeholder">
    <div ref="dropdown"
         slot="dropdownRender"
         slot-scope="menu"
         style="width:300px;">
      <div class="d-year-picker-header">
        <ae-row>
          <ae-col style="text-align: right;"
                  :span="3">
            <ae-icon @mousedown.stop.prevent
                     v-if="!min || startYear > min"
                     style="margin-top:17px;cursor:pointer;"
                     type="left"
                     @click.stop.prevent="switchYearToLeft"/>
          </ae-col>
          <ae-col :span="18">
            <div v-text="`${startYear}年 - ${startYear + 9}年`"
                 class="header"></div>
          </ae-col>
          <ae-col style="text-align: left;"
                  :span="3">
            <ae-icon @mousedown.stop.prevent
                     v-if="!max || endYear < max"
                     style="margin-top:17px;cursor:pointer;"
                     type="right"
                     @click.stop.prevent="switchYearToRight"/>
          </ae-col>
        </ae-row>
      </div>
      <div style="width: 300px; position: relative; overflow: hidden;">
        <ae-row class="d-year-picker-list">
          <ae-col @mousedown.stop.prevent
                  v-for="index in 10"
                  class="d-year-picker-cell"
                  :key="index"
                  :span="6"
                  @click.stop.prevent="toggleValue(startYear + index - 1, $event)">
            <div v-text="startYear + index - 1"
                 class="cell"
                 :class="getItemClass(index)"
                 :disabled="shouldDisabled(startYear + index - 1)"></div>
          </ae-col>
        </ae-row>
      </div>
    </div>
  </d-select>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {Model, Prop, Watch} from 'vue-property-decorator';
  import Grid from '../../ae-grid';
  import Icon from '../../ae-icon';
  import DSelect from '../../d-select';

  Vue.use(Icon);
  Vue.use(Grid);
  @Component({
    name: 'DYearPicker',
    components: {
      DSelect
    }
  })
  export default class DYearPicker extends Vue {
    @Model('change')
    private value!: any;
    @Prop({type: Boolean, default: false})
    private clearable!: boolean;
    @Prop({
      type: Function,
      default: () => false
    })
    private disabledDate!: (year: string) => boolean;
    @Prop(Number)
    public max: number;
    @Prop(Number)
    public min: number;
    @Prop({type: Boolean, default: false})
    private multiple!: boolean;
    private currentValue: number[] | number = this.multiple ? [] : null;
    @Prop({default: '请选择年份', type: String})
    private placeholder!: string;
    private year: number = new Date().getFullYear();

    get startYear(): number {
      return Math.floor(this.year / 10) * 10;
    }

    @Watch('min', {immediate: true})
    public minChanged(min: number) {
      if (min) {
        this.year = this.min;
      }
    }

    @Watch('currentValue', {immediate: true})
    public onSelectedChange(currentValue: string[] | string) {
      this.$emit('change', currentValue);
    }

    @Watch('value', {immediate: true})
    public valueChanged(value: number | number[]) {
      if (this.currentValue !== value) {
        this.currentValue = value;
        if (this.multiple) {
          if ((value as number[]).length) {
            this.year = (value as number[])[0];
          }
        } else {
          this.year = value as number;
        }
      }
    }

    public endYear() {
      return this.startYear + 10;
    }

    public getItemClass(index: number) {
      const {multiple, currentValue, startYear} = this;
      const year = startYear + index - 1;
      return {
        selected: multiple ? (currentValue as number[]).includes(year) : currentValue === year,
        disabled: (this.min && year < this.min) || (this.max && year > this.max)
      };
    }

    private shouldDisabled(year: string) {
      return this.disabledDate(year);
    }

    private switchYearToLeft() {
      this.year -= 10;
    }

    private switchYearToRight() {
      this.year += 10;
    }

    public toggleValue(value: number, event: MouseEvent) {
      const select = this.$refs.select as any;
      if (this.multiple) {
        const val = this.currentValue as number[];
        if (val.includes(value)) {
          val.splice(val.indexOf(value), 1);
        } else {
          val.push(value);
        }
      } else {
        if (value !== this.currentValue) {
          this.currentValue = value;
        }
        select.close();
      }
    }

  }
</script>
<style scoped lang="less">
  .d-year-picker-header {
    .arrow {
      padding: 11px 0;
      font-size: 10px;

      &:hover {
        cursor: pointer;
        color: #2f95ff;
      }
    }

    .header {
      text-align: center;
      font-size: 16px;
      margin-bottom: 0;
      padding: 12px 5px;
      border-bottom: solid 1px #ebeef5;
    }
  }

  .d-year-picker-select-wrapper {
  }


  .d-year-picker-list {
    padding: 15px;

    .d-year-picker-cell {
      font-size: 12px;
      text-align: center;
      padding: 10px 3px;
      cursor: pointer;
      color: #606266;
      background-color: #ffffff00 !important;

      &::after {
        content: "" !important;
      }

      &:hover {
        color: #2f95ff;
      }

      .cell {
        font-size: 16px;

        &.selected {
          background-color: #2f95ff;
          color: white;
        }

        &.disabled {
          color: fade(#000, 25%)
        }
      }
    }

  }
</style>

<template>
  <div>
    <div>
      <d-form :label-width="100">
        <d-form-item label="日期">
          <d-date-picker clearable/>
        </d-form-item>
        <d-form-item label="日期时间">
          <d-date-picker clearable
                         v-model="value1"
                         mode="datetime"/>
        </d-form-item>
        <d-form-item label="月份">
          <d-date-picker clearable
                         v-model="value2"
                         mode="month"/>
        </d-form-item>
        <d-form-item label="周">
          <d-date-picker clearable
                         mode="week"/>
        </d-form-item>
        <d-form-item label="日期范围">
          <d-range-picker/>
        </d-form-item>
      </d-form>
    </div>
    <d-button @click="submit">提交</d-button>
  </div>
</template>
<script lang="ts">
  import axios from 'axios';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DatePicker from './date-picker';

  @Component({
    name: 'Demo1',
    components: {DatePicker}
  })
  export default class Demo1 extends Vue {

    public range = [];
    public range2 = [];
    public value1 = null;
    public value2 = Date.now();
    public value3 = new Date();
    public value4 = new Date();
    public value5 = moment();
    public value6 = new Date();

    public submit() {
      axios.post('/aa', {date: this.value3});
    }

  }
</script>
<style scoped lang="less">
</style>

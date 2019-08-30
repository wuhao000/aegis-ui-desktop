<template>
  <div>
    <d-card>
      <d-form ok-cancel
              layout="horizontal"
              @cancel="$message.error('cancel clicked')"
              @ok="$message.success('ok clicked')">
        <d-form-item help="出错了"
                     has-feedback
                     validate-status="error"
                     label="标题">
          <d-input/>
        </d-form-item>
        <d-form-item label="起止日期">
          <d-input/>
        </d-form-item>
        <d-form-item label="目标描述">
          <d-select/>
        </d-form-item>
        <d-form-item label="衡量标准">
          <d-select/>
        </d-form-item>
      </d-form>
      <d-form layout="inline">
        <d-form-item title="年份">
          <d-select v-model="form.year"
                    placeholder="请选择"
                    :options="yearOptions"></d-select>
        </d-form-item>
        <d-form-item title="月份">
          <d-select v-model="form.month"
                    placeholder="请选择"
                    :options="monthOptions"></d-select>
        </d-form-item>
        <d-form-item>
          <d-button icon="export"
                    :loading="exporting"
                    @click="exportData">导出数据
          </d-button>
        </d-form-item>
      </d-form>
    </d-card>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

    private exporting: boolean = false;
    public form = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    };

    get monthOptions() {
      const options = [];
      for (let i = 1; i <= 12; i++) {
        options.push({label: i + '月', value: i});
      }
      return options;
    }

    get yearOptions() {
      const thisYear = new Date().getFullYear();
      const options = [];
      let year = thisYear - 5;
      while (year <= thisYear) {
        options.push({label: year + '年', value: year});
        year++;
      }
      return options;
    }

    public async exportData() {

    }
  }
</script>
<style scoped lang="less">
</style>

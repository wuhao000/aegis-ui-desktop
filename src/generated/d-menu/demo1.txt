<template>
  <div>
    <d-menu mode="inline" inline-collapsed>
      <d-menu-item key="1">
        这是一个菜单项
      </d-menu-item>
      <d-menu-item key="2">
        这是一个菜单项
      </d-menu-item>
      <d-menu-item key="3">
        这是一个菜单项
      </d-menu-item>
    </d-menu>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DMenu from '../../index';

  Vue.use(DMenu);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style scoped lang="less">
</style>

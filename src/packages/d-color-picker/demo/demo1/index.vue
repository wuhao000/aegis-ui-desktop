<template>
  <div>
    <d-color-picker v-model="color"
                    @change="headleChangeColor"
                    default-color="#666"
                    :disabled="colorPickerDisabled"/>
    <div>
      {{color}}
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public color: string = '#ff0000';
    public colorPickerDisabled: boolean = false;

    public headleChangeColor() {
      console.log(this.color);
    }
  }
</script>
<style scoped lang="less">
</style>

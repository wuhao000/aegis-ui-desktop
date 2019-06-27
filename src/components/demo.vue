<template>
  <router-view/>
</template>
<script lang="ts">
  import AegisUI from '@/packages';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(AegisUI);

  @Component({
    name: 'Components'
  })
  export default class Components extends Vue {
    public refreshing = false;

    get component(): string {
      return this.$route.query && this.$route.query['component'] as string;
    }

    public refresh() {
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
      }, 2000);
    }
  }
</script>
<style lang="less" type="text/less">
  #app-content {
    padding: 0;
  }
</style>

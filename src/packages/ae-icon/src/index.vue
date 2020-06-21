<template>
  <a-icon v-bind="$attrs"
          :style="cssStyle"
          v-on="$listeners"/>
</template>
<script lang="ts">
  import Vue from 'vue';

  const fonts = {
    xs: 12, sm: 14, md: 16, lg: 24, xl: 32, xxl: 48
  };
  export default Vue.extend({
    props: {
      size: {type: [Number, String]},
      color: String
    },
    computed: {
      cssStyle() {
        const style: any = {
          fontSize: typeof this.size === 'number' ? `${this.size}px` : (this.size ? `${fonts[this.size]}px` : 'inherit')
        };
        if (this.color) {
          style.color = this.color;
        }
        return style;
      }
    }
  });
</script>

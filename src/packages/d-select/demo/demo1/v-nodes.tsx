import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'VNodes'
})
export default class VNodes extends Vue {

  @Prop()
  public vnodes: any;

  public render() {
    return this.vnodes;
  }
}

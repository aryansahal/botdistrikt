import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class OrderItemComponent extends Component {
  @tracked quantity = this.args.item.quantity || 0;

  @action
  updateQuantity(event) {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      this.args.updateQuantity(this.args.item, newQuantity);
    }
  }
}

// app/controllers/order.js
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class OrderController extends Controller {
  @service auth;
  @service router;
  @tracked quantity;
  @tracked orderItems = new Map(); // Tracks item IDs and their quantities

  calculateTotal() {
    let total = 0;
    this.orderItems.forEach(({ quantity, price }) => {
      total += quantity * price;
    });
    return total;
  }

  @action
  updateOrder(item, quantity) {
    if (quantity > 0) {
      this.orderItems.set(item.id, { quantity, price: item.price });
    } else {
      this.orderItems.delete(item.id);
    }
  }

  @action
  async submitOrder(event) {
    event.preventDefault();
    if (!this.auth.isAuthenticated || !this.auth.user) {
      this.router.transitionTo('login');
      return;
    }

    const items = Array.from(this.orderItems.entries()).map(
      ([id, { quantity, price }]) => ({
        menuItemId: id, // Adjust the property name to match your backend model
        quantity,
      }),
    );

    const orderDetails = {
      customerId: this.auth.user.id,
      orderDate: new Date().toISOString(),
      totalAmount: this.calculateTotal(),
    };

    try {
      // Step 1: Create the Order
      const orderResponse = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.auth.accessToken}`,
        },
        body: JSON.stringify(orderDetails),
      });

      if (!orderResponse.ok) {
        const error = await orderResponse.json();
        throw new Error('Failed to submit order: ' + error.message);
      }

      const orderData = await orderResponse.json();
      const orderId = orderData.id;

      // Step 2: Create OrderItems and associate with the Order
      for (const item of items) {
        const orderItemResponse = await fetch(
          'http://localhost:3000/order-items',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.auth.accessToken}`,
            },
            body: JSON.stringify({
              orderId: orderId,
              menuItemId: item.menuItemId,
              quantity: item.quantity,
            }),
          },
        );

        if (!orderItemResponse.ok) {
          const error = await orderItemResponse.json();
          throw new Error('Failed to submit order items: ' + error.message);
        }
      }

      // Transition to success page after successfully submitting order and order items
      this.router.transitionTo('customer-details');
    } catch (error) {
      console.error('Error submitting order:', error);
      // Optionally update the UI to show the error message
    }
  }
}

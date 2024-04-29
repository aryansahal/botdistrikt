import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CustomerDetailsRoute extends Route {
  @service auth;
  @service router;

  beforeModel(transition) {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('customer');
    }
  }

  async model() {
    console.log('AuthService User:', this.auth.user);
    if (!this.auth.isAuthenticated || !this.auth.user) {
      throw new Error('User is not properly authenticated');
    }

    try {
      const response = await fetch(
        `http://localhost:3000/customers/${this.auth.user.id}/orders`,
        {
          headers: {
            Authorization: `Bearer ${this.auth.accessToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch customer details and order history');
      }

      const customerDetails = await response.json();
      console.log('Customer Details:', customerDetails);
      return { customer: customerDetails, orders: customerDetails.orders };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {};
    }
  }
}

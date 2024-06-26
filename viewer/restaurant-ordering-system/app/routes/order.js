import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('customer');
    }
  }

  async model() {
    try {
      const response = await fetch('http://localhost:3000/menu-items');
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      const menuItems = await response.json();
      return menuItems;
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return [];
    }
  }
}

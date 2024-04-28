import Route from '@ember/routing/route';

export default class MenuRoute extends Route {
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
      // Handle errors more gracefully in a real application
      return [];
    }
  }
}

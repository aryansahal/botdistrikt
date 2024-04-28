import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default class AuthService extends Service {
  @service router;
  @tracked isAuthenticated = false;
  @tracked user = null; // Now storing user as an object to include more details
  @tracked accessToken = '';
  @tracked errorMessage = '';

  constructor() {
    super(...arguments);
    this.restoreAuth();
    this.logout = this.logout.bind(this);
  }
  restoreAuth() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    if (user && token) {
      this.user = JSON.parse(user);
      this.accessToken = token;
      this.isAuthenticated = true;
    }
  }
  async login(username, password) {
    try {
      const response = await fetch('http://localhost:3000/customers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        this.isAuthenticated = true;
        this.user = {
          id: data.customer.id,
          username: data.customer.username,
        };
        this.accessToken = data.token;
        localStorage.setItem('authToken', this.accessToken);
        localStorage.setItem('user', JSON.stringify(this.user));
        return true;
      } else {
        this.isAuthenticated = false;
        this.user = null;
        this.errorMessage = 'Invalid username or password. Please try again.';
        return false; // Authentication failed
      }
    } catch (error) {
      console.error('Error during login:', error);
      this.isAuthenticated = false;
      this.user = null;
      this.errorMessage =
        'An unexpected error occurred. Please try again later.';
      return false; // Authentication failed due to an error
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
    this.accessToken = '';
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.router.transitionTo('customer');
  }
  resetAuth() {
    this.isAuthenticated = false;
    this.user = null;
    this.accessToken = '';
    this.errorMessage = '';
  }
}

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CustomerLoginComponent extends Component {
  @service auth;
  @service router;
  username = '';
  password = '';
  errorMessage = '';

  @action
  async login(event) {
    event.preventDefault();
    try {
      await this.auth.login(this.username, this.password);
      this.router.transitionTo('customer-details', {
        queryParams: { username: this.username },
      });
    } catch (error) {
      this.errorMessage = 'Invalid username or password. Please try again.';
    }
  }

  @action
  setUsername(event) {
    this.username = event.target.value;
  }

  @action
  setPassword(event) {
    this.password = event.target.value;
  }
}

import EmberRouter from '@ember/routing/router';
import config from 'restaurant-ordering-system/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' });
  this.route('menu');
  this.route('customer');
  this.route('order');
  this.route('customer-details', { path: '/customer-details' });
});

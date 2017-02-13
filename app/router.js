import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('map');
  this.route('about');
  this.route('busses', function() {
    this.route('bus', { path: ':routeId' });
  });
  this.route('stop-times', { path: 'busses/:routeId/stop-times/:stopId' });
});

export default Router;

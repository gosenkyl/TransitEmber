import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('routes');
  this.route('stops', {path: '/routes/:routeId/stops'});
  this.route('stop-times', { path: 'routes/:routeId/stops/:stopId/stop-times'});

  this.route('map');

  this.route('about');

});

export default Router;

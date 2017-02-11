import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('map');
  this.route('about');
  this.route('routes', function() {
    this.route('route', { path: ':routeId' }, function(){
      this.route('stop', { path: 'stop/:stopId' });
    });

  });
});

export default Router;

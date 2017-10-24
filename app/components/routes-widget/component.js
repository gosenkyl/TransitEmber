import Ember from 'ember';
import {task} from 'ember-concurrency';

const {
  Component,
  inject,
  get,
  set
  } = Ember;

export default Component.extend({

  classNames: ["routes"],

  store: inject.service(),

  routes: null,

  getRoutes: task(function * (){
    let routes = yield get(this, "store").findAll("route");
    set(this, "routes", routes);
    return routes;
  }).on('init')

});

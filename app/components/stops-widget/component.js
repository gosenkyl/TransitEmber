import Ember from 'ember';
import {task} from 'ember-concurrency';

let {
  Component,
  computed,
  get,
  set,
  inject
  } = Ember;

export default Component.extend({
  classNames: ["stops"],

  store: inject.service(),

  routeId: null,
  route: null,

  getRoute: task(function * (){
    let route = yield get(this, "store").findRecord("route", get(this, "routeId"));
    set(this, "route", route);
    return route;
  }).on("init"),

  getRouteToStops: task(function * (){
    let routeToStops = yield get(this, "store").query("route-to-stop", {routeId: get(this, "routeId")});
    set(this, "routeToStops", routeToStops);
    return routeToStops;
  }).on("init"),

  sort: ["directionId:asc", "stop.stopName:asc"],
  routeToStopsSorted: computed.sort("routeToStops", "sort")

});

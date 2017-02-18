import Ember from 'ember';

let {
  Component,
  computed,
  get,
  inject
  } = Ember;

export default Component.extend({

  classNames: ["stops list columns"],

  routeId: null,

  busService: inject.service("bus"),

  routeToStops: computed("routeId", function(){
    return get(this, "busService").getStops(get(this, "routeId"));
  }),

  sort: ["directionId:asc"],
  routeToStopsSorted: computed.sort("routeToStops", "sort")

});

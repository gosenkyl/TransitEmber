import Ember from 'ember';

let {
  Component,
  computed,
  get,
  inject
  } = Ember;

export default Component.extend({

  routeId: null,

  busService: inject.service("bus"),

  stops: computed("routeId", function(){
    return get(this, "busService").getStops(get(this, "routeId"));
  })

});

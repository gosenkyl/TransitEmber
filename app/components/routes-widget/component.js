import Ember from 'ember';

let {
  Component,
  computed,
  inject,
  get
  } = Ember;

export default Component.extend({

  busService: inject.service("bus"),

  routes: computed(function(){
    return get(this, "busService").getRoutes();
  })

});

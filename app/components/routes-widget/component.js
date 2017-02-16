import Ember from 'ember';

let {
  Component,
  computed,
  inject,
  get
  } = Ember;

export default Component.extend({

  classNames: ["routes"],

  busService: inject.service("bus"),

  routes: computed(function(){
    return get(this, "busService").getRoutes();
  })

});

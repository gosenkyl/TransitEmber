import Ember from 'ember';

let {
  Component,
  computed,
  get,
  isPresent,
  inject
  } = Ember;

export default Component.extend({
  classNames: ["route"],

  router: inject.service(),

  route: null,

  routeDescription: computed("route", function(){
    let shortName = get(this, "route.routeShortName");
    let longName = get(this, "route.routeLongName");

    if(isPresent(longName)){
      shortName += " | ";
    }

    return shortName + longName;
  }),

  actions: {
    onSelectRoute(){
      get(this, "router").transitionTo("stops", get(this, "route.id"));
    }
  }

});

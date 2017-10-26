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

  isMap: false,

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
      let isMap = get(this, "isMap");

      if(isMap == "true"){
        get(this, "router").transitionTo("map", get(this, "route.id"));
      } else {
        get(this, "router").transitionTo("stops", get(this, "route.id"));
      }
    }
  }

});

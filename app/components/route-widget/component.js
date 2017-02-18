import Ember from 'ember';

let {
  Component,
  computed,
  get,
  isPresent
  } = Ember;

export default Component.extend({

  classNames: ["route detail"],

  route: null,

  routeDescription: computed("route", function(){
    let shortName = get(this, "route.routeShortName");
    let longName = get(this, "route.routeLongName");

    if(isPresent(longName)){
      shortName += " - ";
    }

    return shortName + longName;
  })

});

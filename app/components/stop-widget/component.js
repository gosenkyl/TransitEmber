import Ember from 'ember';

let {
  Component,
  computed,
  get,
  isPresent,
  inject
} = Ember;

export default Component.extend({
  classNames: ["stop"],

  router: inject.service(),

  isMap: false,

  routeId: null,
  stop: null,
  directionId: null,

  stopName: computed.reads("stop.stopName"),

  stopDescription: computed("directionId", "stopName", function(){
    let directionId = "";
    if(isPresent(get(this, "directionId"))){
      directionId += `${get(this, "directionId")} ~ `;
    }
    return directionId + get(this, "stopName");
  }),

  actions: {
    onSelectStop(){
      let isMap = get(this, "isMap");

      if(isMap == "true"){
        get(this, "router").transitionTo("map", get(this, "routeId"), get(this, "stop.id"));
      } else {
        get(this, "router").transitionTo("stop-times", get(this, "routeId"), get(this, "stop.id"));
      }
    }
  }

});

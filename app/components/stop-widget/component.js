import Ember from 'ember';

let {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({

  classNames: ["stop detail"],

  stop: null,
  directionId: null,

  stopName: computed.reads("stop.stopName"),

  text: computed("stop", function(){
    return get(this, "directionId") + " ~ " + get(this, "stopName")
  })

});

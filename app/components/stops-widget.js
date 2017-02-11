import Ember from 'ember';
import DS from 'ember-data';

let {
  Component,
  computed,
  $,
  get
} = Ember;

let {
  PromiseArray
} = DS;

export default Component.extend({

  routeId: null,

  stops: computed("routeId", function(){

    return PromiseArray.create({
      promise: $.getJSON("http://localhost:8081/api/routetostops/" + get(this, "routeId"), function (data) {
        return data;
      })
    });

  })

});

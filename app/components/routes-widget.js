import Ember from 'ember';
import DS from 'ember-data';

let {
  Component,
  computed,
  $
} = Ember;

let {
  PromiseArray
} = DS;

export default Component.extend({

  routes: computed(function(){
    return PromiseArray.create({
      promise: $.getJSON("http://localhost:8081/api/routes", function (data) {
        return data;
      })
    });
  })

});

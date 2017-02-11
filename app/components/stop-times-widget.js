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
  stopId: null,
  date: null,

  stopTimes: computed("routeId", "stopId", "date", function(){

    let routeId = "1";
    let stopId = get(this, "stopId");
    let date = "01/01/2017";

    let params = "?routeId="+routeId+"&stopId="+stopId+"&date="+date;

    return PromiseArray.create({
      promise: $.getJSON("http://localhost:8081/api/stoptimes" + params, function (data) {
        return data;
      })
    });

  })

});

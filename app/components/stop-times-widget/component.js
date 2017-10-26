import Ember from 'ember';
import {task} from 'ember-concurrency';

let {
  Component,
  computed,
  get,
  set,
  isPresent,
  inject
  } = Ember;

export default Component.extend({
  classNames: ["stop-times"],

  stopTimesService: inject.service("stop-times"),

  routeId: null,
  stopId: null,

  stopTimes: null,

  date: computed({
    get(){
      return new Date();
    },
    set(k, v){
      return isPresent(v) ? v : null;
    }
  }),

  isToday: computed("date", function(){
    return get(this, "date").getDate() === new Date().getDate();
  }),

  noTimesText: computed("date", function(){
    return get(this, "date").getDate() === new Date().getDate() ? "No Times Remaining Today" : "No Times Exist For " + get(this, "date").getDate();
  }),

  getStopTimes: task(function * (){
    let routeId = get(this, "routeId");
    let stopId = get(this, "stopId");
    let date = "2017-10-25";

    let stopTimes = yield get(this, "stopTimesService.getStopTimes").perform(routeId, stopId, date);
    set(this, "stopTimes", stopTimes);
    return stopTimes;
  }).on("init")

});

import Ember from 'ember';
import {task} from 'ember-concurrency';

let {
  Component,
  computed,
  get,
  set,
  isEmpty,
  isPresent,
  inject
  } = Ember;

export default Component.extend({
  classNames: ["stop-times"],

  store: inject.service(),

  routeId: null,
  stopId: null,

  date: computed({
    get(){
      return new Date();
    },
    set(k, v){
      return isPresent(v) ? v : null;
    }
  }),

  isShowAll: true,
  isHidePrevious: true,

  isToday: computed("date", function(){
    return get(this, "date").getDate() === new Date().getDate();
  }),

  noTimesText: computed("date", function(){
    return get(this, "date").getDate() === new Date().getDate() ? "No Times Remaining Today" : "No Times Exist For " + get(this, "date").getDate();
  }),

  stopTimes: null,

  getStopTimes: task(function * (){
    let routeId = get(this, "routeId");
    let stopId = get(this, "stopId");
    let date = "2017-10-23";

    let stopTimes = yield get(this, "store").query("stop-time", {routeId: routeId, stopId: stopId, date: date});
    set(this, "stopTimes", stopTimes);

    return stopTimes;
  }).on("init"),

  filteredStopTimes: computed("isShowAll", "isHidePrevious", "isToday", "stopTimes.[]", function(){
    let stopTimes = get(this, "stopTimes");

    if(isEmpty(stopTimes)){
      return Ember.A();
    }

    let isShowAll = get(this, "isShowAll");
    let isHidePrevious = get(this, "isHidePrevious");
    let isToday = get(this, "isToday");

    if(isToday === false || isHidePrevious === false){
      return stopTimes;
    }

    let now = new Date();
    let nowHours = now.getHours();
    let nowMinutes = now.getMinutes();

    return stopTimes.filter((stopTime) => {
      let timeParts = get(stopTime, "departureTime").split(":");

      if((timeParts.length >= 2) === false){
        return false;
      }

      let hours = parseInt(timeParts[0]);
      let minutes = parseInt(timeParts[1]);

      // Who decided hours can be >= 24????
      if(hours >= 24){
        return true;
      }

      if(hours > nowHours){
        return true;
      } else if(hours === nowHours && minutes >= nowMinutes){
        return true;
      }

      return false;
    });

  })

});

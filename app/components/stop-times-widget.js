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
  date: new Date(),

  isToday: computed("date", function(){
    return get(this, "date").getDate() === new Date().getDate();
  }),

  noTimesText: computed("date", function(){
    return get(this, "date").getDate() === new Date().getDate() ? "No Times Remaining Today" : "No Times Exist For " + get(this, "date").getDate();
  }),

  isShowAll: true,
  isHidePrevious: true,

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
  }),

  filteredStopTimes: computed("isShowAll", "isHidePrevious", "isToday", "stopTimes.[]", function(){

    let isShowAll = get(this, "isShowAll");
    let isHidePrevious = get(this, "isHidePrevious");
    let isToday = get(this, "isToday");

    let stopTimes = get(this, "stopTimes");

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

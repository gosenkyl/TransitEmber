import Ember from 'ember';
import {task} from 'ember-concurrency';

let {
  Service,
  get,
  isEmpty,
  inject,
  A:emberA
  } = Ember;

export default Service.extend({

  store: inject.service(),

  getStopTimes: task(function * (routeId, stopId, date, filterByTime = true){
    date = "2017-10-25"; // TODO Change to passed in date || today

    let stopTimes = yield get(this, "store").query("stop-time", {routeId: routeId, stopId: stopId, date: date});

    return filterByTime ? this.filterStopTimes(stopTimes, filterByTime) : stopTimes;
  }),

  filterStopTimes(stopTimes){
    if(isEmpty(stopTimes)){
      return emberA();
    }

    let now = new Date();
    let nowHours = now.getHours();
    let nowMinutes = now.getMinutes();

    return stopTimes.filter((stopTime) => {
      let timeParts = get(stopTime, "departureTime").split(":");

      if(get(timeParts, "length") >= 2 === false){
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

  }

});

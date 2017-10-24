import Ember from 'ember';

let {
  Component,
  computed,
  get,
  set
  } = Ember;

export default Component.extend({

  stopTime: null,
  afterMidnight: false,

  displayTime: computed("stopTime.departureTime", function(){
    let time = get(this, "stopTime.departureTime");

    let timeParts = time.split(":");

    if((timeParts.length >= 2) === false){
      return "";
    }

    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);
    let ampm = "am";

    if(hours >= 12 && hours < 24){
      ampm = "pm";

      if(hours > 12) {
        hours -= 12;
      }
    }

    if(hours >= 24){
      set(this, "afterMidnight", true);

      if(hours > 24) {
        hours -= 24;
      } else {
        hours = 12;
      }
    }

    hours = hours.toString();
    minutes = minutes.toString();

    if(hours.length === 1){
      hours = "0" + hours;
    }

    if(minutes.length === 1){
      minutes = "0" + minutes;
    }

    return hours + ":" + minutes + " " + ampm;
  })

});

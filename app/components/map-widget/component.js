import Ember from 'ember';
import {task} from 'ember-concurrency';
import moment from 'moment';

const {Component, get, set, inject, isPresent, computed} = Ember;

export default Component.extend({
  classNames: ["map"],

  store: inject.service(),
  geolocation: inject.service(),
  distance: inject.service(),
  stopTimesService: inject.service("stop-times"),

  route: null,
  routeToStops: null,
  currentLocation: null,

  selectedRouteToStop: null,
  pov: computed("selectedRouteToStop", {
    get(){
      let selectedLocationName = get(this, "selectedRouteToStop.stop.stopName");
      let firstWord = selectedLocationName.split(' ')[0].trim();

      let heading = 0;
      if(firstWord === "nbd"){
        heading = 90;
      } else if(firstWord === "ebd"){
        heading = 180;
      } else if(firstWord === "sbd") {
        heading = 270;
      }

      return {
        heading: heading,
        pitch: 0
      }
    }
  }),

  init(){
    this._super(...arguments);

    get(this, "loadData").perform();
  },

  loadData: task(function * (){
    let geolocation = yield get(this, "getGeolocation").perform();

    let routeToStops = yield get(this, "getRouteToStops").perform();

    return {geolocation: geolocation, routeToStops: routeToStops};
  }),

  getRouteToStops: task(function * (){
    let routeToStops = yield get(this, "store").query("route-to-stop", {routeId: get(this, "route.id")});

    let sortMethod = get(this, "sortByDirectionSequence");
    if(isPresent(get(this, "currentLocation"))){
      sortMethod =  get(this, "sortByGeolocation").bind(this);
    }

    routeToStops = routeToStops.toArray().sort(sortMethod);

    set(this, "routeToStops", routeToStops);
    return routeToStops;
  }),

  getStopTimes: task(function * (){
    let routeId = get(this, "route.id");
    let stopId = get(this, "selectedRouteToStop.stop.id");
    let date = moment().format("YYYY-MM-DD");//"2017-10-25";

    let stopTimes = yield get(this, "stopTimesService.getStopTimes").perform(routeId, stopId, date, false);
    set(this, "stopTimes", stopTimes);
    return stopTimes;
  }),

  sortByDirectionSequence(a, b){
    let aDirection = get(a, "directionId");
    let bDirection = get(b, "directionId");

    if(aDirection === bDirection){
      let aSequence = get(a, "stopSequence");
      let bSequence = get(b, "stopSequence");

      return aSequence < bSequence ? -1 : aSequence > bSequence ? 1 : 0;
    }

    return aDirection < bDirection ? -1 : aDirection > bDirection ? 1 : 0;
  },

  sortByGeolocation(a, b){
    let currentLocation = get(this, "currentLocation");
    let currentLat = get(currentLocation, "latitude");
    let currentLng = get(currentLocation, "longitude");

    let aDistance = get(this, "distance").calculateDistance(currentLat, currentLng, get(a, "stop.stopLat"), get(a, "stop.stopLon"));
    let bDistance = get(this, "distance").calculateDistance(currentLat, currentLng, get(b, "stop.stopLat"), get(b, "stop.stopLon"));

    return aDistance < bDistance ? -1 : aDistance > bDistance ? 1 : 0;
  },

  getGeolocation: task(function * (){
    let result;

    try {
      let geolocation = yield get(this, "geolocation").getLocation();
      let currentLocation = get(geolocation, "coords");
      set(this, "currentLocation", currentLocation);
      result = currentLocation;
    } catch(e){
      console.error(e);
      result = null;
    }

    return result;
  }),

  actions: {
    onSelectMarker(routeToStop){
      this.send("onSelectStop", routeToStop);
    },

    onSelectStop(routeToStop){
      set(this, "selectedRouteToStop", routeToStop);
      get(this, "getStopTimes").perform();
    },

    onBack(){
      set(this, "selectedRouteToStop", null);
      set(this, "stopTimes", null);
    }
  }

});

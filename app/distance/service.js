import Ember from 'ember';

export default Ember.Service.extend({

  calculateDistance(lat1,lon1,lat2,lon2) {
    return this.toMiles(this.getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2));
  },

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2-lon1);
    let a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  },

  deg2rad(deg) {
    return deg * (Math.PI/180)
  },

  toMiles(km){
    return km * 0.621371;
  }

});

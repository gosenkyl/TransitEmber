import Ember from 'ember';

const {Helper, inject, get} = Ember;

export default Helper.extend({
  distance: inject.service(),

  compute(params, hash) {
    return get(this, "distance").calculateDistance(hash.aLat, hash.aLng, hash.bLat, hash.bLng).toFixed(1);
  }
});

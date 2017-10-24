import DS from 'ember-data';

export default DS.Model.extend({

  arrivalTime: DS.attr(),
  departureTime: DS.attr(),
  pickupType: DS.attr(),
  shapeDistTraveled: DS.attr(),
  stopId: DS.attr(),
  stopSequence: DS.attr(),
  tripId: DS.attr(),
  stopHeadsign: DS.attr(),
  dropOffType: DS.attr(),
  timepoint: DS.attr()

});

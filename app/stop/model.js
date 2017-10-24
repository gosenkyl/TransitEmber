import DS from 'ember-data';

export default DS.Model.extend({

  stopCode: DS.attr(),
  stopDesc: DS.attr(),
  stopLat: DS.attr(),
  stopLon: DS.attr(),
  stopName: DS.attr(),
  wheelchairBoarding: DS.attr(),
  zoneId: DS.attr(),
  stopUrl: DS.attr(),
  locationType: DS.attr(),
  parentStation: DS.attr(),
  stopTimezone: DS.attr()

});

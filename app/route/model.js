import DS from 'ember-data';

export default DS.Model.extend({

  agencyId: DS.attr(),
  routeColor: DS.attr(),
  routeLongName: DS.attr(),
  routeShortName: DS.attr(),
  routeTextColor: DS.attr(),
  routeType: DS.attr(),
  routeDesc: DS.attr(),
  routeUrl: DS.attr()

});

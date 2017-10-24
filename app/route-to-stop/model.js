import DS from 'ember-data';

export default DS.Model.extend({

  directionId: DS.attr(),
  stopSequence: DS.attr(),

  route: DS.belongsTo("route"),
  stop: DS.belongsTo("stop")

});

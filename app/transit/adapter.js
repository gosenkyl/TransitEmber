import Ember from 'ember';
import DS from 'ember-data';

let {
  isEmpty
  } = Ember;

export default DS.RESTAdapter.extend({

  //host: "http://localhost:8081",
  namespace: "api",

  shouldReloadAll(/*store, records*/) {
    return false;
  },

  shouldBackgroundReloadAll(store, records) {
    return isEmpty(records);
  },

  shouldReloadRecord(/*store, record*/) {
    return false;
  },

  shouldBackgroundReloadRecord(store, record) {
    return isEmpty(record);
  }

});

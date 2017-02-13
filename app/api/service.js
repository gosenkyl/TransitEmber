import Ember from 'ember';
import DS from 'ember-data';

let {
  Service,
  computed,
  $,
  get
  } = Ember;

let {
  PromiseArray
  } = DS;

export default Service.extend({

  hostName: "http://localhost",
  port: "8081",
  serviceName: "api",

  uri: computed("hostName", "port", "serviceName", function(){
    return get(this, "hostName") + ":" + get(this, "port") + "/" + get(this, "serviceName") + "/";
  }),

  getData(params){
    params = params || "";

    return $.getJSON(get(this, "uri") + params, function (data) {
      return data;
    })
  },

  getDataAsPromiseArray(params){
    return PromiseArray.create({
      promise: this.getData(params)
    });
  }

});

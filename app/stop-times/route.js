import Ember from 'ember';

let {
  Route
  } = Ember;

export default Route.extend({

  model(params){
    return params;
  }

});

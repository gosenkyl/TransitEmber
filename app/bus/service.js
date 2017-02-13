import Api from '../api/service';
import DS from 'ember-data';

export default Api.extend({

  getRoutes(){
    return this.getDataAsPromiseArray("routes");
  },

  getStops(routeId){
    return this.getDataAsPromiseArray("routetostops/" + routeId);
  },

  getStopTimes(routeId, stopId, date){
    let params = "?routeId="+routeId+"&stopId="+stopId+"&date="+date;

    return this.getDataAsPromiseArray("stoptimes/" + params);
  }

});

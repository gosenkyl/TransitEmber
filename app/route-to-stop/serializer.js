import DS from 'ember-data';
import TransitSerializer from '../transit/serializer';

export default TransitSerializer.extend(DS.EmbeddedRecordsMixin, {

  attrs: {
    route: {deserialize: 'records', serialize: false},
    stop: {deserialize: 'records', serialize: false}
  }

});

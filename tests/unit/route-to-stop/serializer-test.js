import { moduleForModel, test } from 'ember-qunit';

moduleForModel('route-to-stop', 'Unit | Serializer | route to stop', {
  // Specify the other units that are required for this test.
  needs: ['serializer:route-to-stop']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});

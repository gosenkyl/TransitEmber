import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('stop-time-widget', 'Integration | Component | stop time widget', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{stop-time-widget}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#stop-time-widget}}
      template block text
    {{/stop-time-widget}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'restaurant-ordering-system/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | order-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<OrderItem />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <OrderItem>
        template block text
      </OrderItem>
    `);

    assert.dom().hasText('template block text');
  });
});

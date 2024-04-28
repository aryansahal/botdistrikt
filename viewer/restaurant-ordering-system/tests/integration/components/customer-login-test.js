import { module, test } from 'qunit';
import { setupRenderingTest } from 'restaurant-ordering-system/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | customer-login', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CustomerLogin />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <CustomerLogin>
        template block text
      </CustomerLogin>
    `);

    assert.dom().hasText('template block text');
  });
});

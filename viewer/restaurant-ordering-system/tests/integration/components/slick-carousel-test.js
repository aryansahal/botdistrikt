import { module, test } from 'qunit';
import { setupRenderingTest } from 'restaurant-ordering-system/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | slick-carousel', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<SlickCarousel />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <SlickCarousel>
        template block text
      </SlickCarousel>
    `);

    assert.dom().hasText('template block text');
  });
});

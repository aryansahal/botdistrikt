import { module, test } from 'qunit';
import { setupTest } from 'restaurant-ordering-system/tests/helpers';

module('Unit | Route | order', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:order');
    assert.ok(route);
  });
});

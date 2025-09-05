import assert from 'node:assert/strict';
import { test } from 'node:test';

import { transform } from './helpers.js';

test('babel', async (t) => {
  await t.test('import.meta.resolve()', async () => {
    let transformed = await transform(
      `const foo = import.meta.resolve('./foo.png');`,
    );

    assert.strictEqual(
      transformed,
      `import _default from "./foo.png";\nconst foo = _default;`,
    );
  });
});

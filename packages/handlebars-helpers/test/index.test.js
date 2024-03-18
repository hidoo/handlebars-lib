import assert from 'node:assert';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as helpers from '../src/index.js';

describe('@hidoo/handlebars-helpers', () => {
  let dirname = null;
  let require = null;

  before(() => {
    dirname = path.resolve(fileURLToPath(import.meta.url));
    require = createRequire(import.meta.url);
  });

  it('should be importable.', () => {
    assert(require.resolve('@hidoo/handlebars-helpers'));
  });

  it('should export all helpers.', async () => {
    const files = await fs.readdir(path.resolve(dirname, '../../src'));
    const ignoreNames = ['index', 'register'];
    const exportsHelpers = Object.keys(helpers);

    files
      .filter((file) => path.extname(file) === '.js')
      .map((file) => path.basename(file, '.js'))
      .forEach((file) => {
        const name = path.basename(file, '.js');

        if (ignoreNames.includes(name)) {
          return;
        }

        assert(exportsHelpers.includes(name));
      });
  });
});

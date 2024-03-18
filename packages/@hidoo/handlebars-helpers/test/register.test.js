import assert from 'node:assert';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Handlebars from 'handlebars';
import register from '../src/register.js';

describe('@hidoo/handlebars-helpers/register', () => {
  let dirname = null;
  let require = null;

  before(() => {
    dirname = path.resolve(fileURLToPath(import.meta.url));
    require = createRequire(import.meta.url);
  });

  it('should be importable.', () => {
    assert(require.resolve('@hidoo/handlebars-helpers/register'));
  });

  it('should register all helpers.', async () => {
    const files = await fs.readdir(path.resolve(dirname, '../../src'));
    const ignoreNames = ['index', 'register'];
    const hbs = Handlebars.create();

    register(hbs);

    const registeredHelpers = Object.keys(hbs.helpers);

    files
      .filter((file) => path.extname(file) === '.js')
      .map((file) => path.basename(file, '.js'))
      .forEach((file) => {
        const name = path.basename(file, '.js');

        if (ignoreNames.includes(name)) {
          return;
        }

        assert(registeredHelpers.includes(name));
      });
  });
});

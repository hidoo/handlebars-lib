import assert from 'assert';
import fs from 'fs';
import path from 'path';
import util from 'util';
import * as helpers from '../src';

const readdir = util.promisify(fs.readdir);

describe('@hidoo/handlebars-helpers', () => {
  it('should export all helpers.', async () => {
    const files = await readdir(path.resolve(__dirname, '../src'));
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

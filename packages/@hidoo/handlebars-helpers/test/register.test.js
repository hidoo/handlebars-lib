import assert from 'assert';
import fs from 'fs';
import path from 'path';
import util from 'util';
import Handlebars from 'handlebars';
import register from '../src/register';

const readdir = util.promisify(fs.readdir);

describe('@hidoo/handlebars-helpers/register', () => {
  it('should register all helpers.', async () => {
    const files = await readdir(path.resolve(__dirname, '../src'));
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

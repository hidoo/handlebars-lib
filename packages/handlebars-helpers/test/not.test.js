import assert from 'node:assert';
import Handlebars from 'handlebars';
import not, { register } from '../src/not.js';

const DEBUG = Boolean(process.env.DEBUG);

describe('{{not value}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('not', not);
    template = hbs.compile('{{not value}}');
  });

  context('if no arguments.', () => {
    it('should return true.', () => {
      assert.equal(not(), true);
      assert.equal(template({}), 'true');
    });
  });

  context('if <value> is specified.', () => {
    it('should return an inverted boolean.', () => {
      const cases = [
        [false, true],
        [true, false],
        [0, true],
        [1, false],
        ['', true],
        ['a', false],
        [[], false],
        [{}, false],
        [null, true]
      ];

      cases.forEach(([value, expected]) => {
        {
          const actual = not(value);

          if (DEBUG) {
            console.log('[DEBUG] not: %O => %O = %O', value, actual, expected);
          }

          assert(typeof actual === 'boolean');
          assert.equal(actual, expected);
        }
        {
          const actual = template({ value });

          if (DEBUG) {
            console.log(
              '[DEBUG] {{not}}: %O => %O = %O',
              value,
              actual,
              expected
            );
          }

          assert(typeof actual === 'string');
          assert.equal(actual, String(expected));
        }
      });
    });
  });

  describe('register', () => {
    it('should register with specified Handlebars instance.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', not);

      assert(hbs.helpers.not === hbs.helpers.viaRegisterHelper);
    });
  });
});

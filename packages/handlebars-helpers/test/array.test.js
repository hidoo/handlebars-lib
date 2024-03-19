import assert from 'node:assert';
import Handlebars from 'handlebars';
import array, { register } from '../src/array.js';
import toJson from '../src/toJson.js';

const DEBUG = Boolean(process.env.DEBUG);

describe('{{array [value] [value2] ...}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('array', array);
    hbs.registerHelper('toJson', toJson);
    template = hbs.compile('{{{toJson (array value value2 value3)}}}');
  });

  context('if no arguments.', () => {
    it('should return an empty array.', () => {
      assert.deepEqual(array(), []);
      assert.deepEqual(template({}), '[]');
    });
  });

  context('if arguments are specified.', () => {
    it('should return an array.', () => {
      const cases = [
        [['a'], ['a']],
        [
          ['a', {}],
          ['a', {}]
        ],
        [
          ['a', {}, null],
          ['a', {}, null]
        ]
      ];

      cases.forEach(([args, expected]) => {
        {
          const actual = array(...args);

          if (DEBUG) {
            console.log('[DEBUG] array: %O => %O = %O', args, actual, expected);
          }

          assert(Array.isArray(actual));
          assert.deepEqual(actual, expected);
        }
        {
          const [value, value2, value3] = args;
          const actual = template({ value, value2, value3 });

          if (DEBUG) {
            console.log(
              '[DEBUG] {{array}}: %O => %O = %O',
              args,
              actual,
              JSON.stringify(expected)
            );
          }

          assert(typeof actual === 'string');
          assert.equal(actual, JSON.stringify(expected));
        }
      });
    });
  });

  describe('register', () => {
    it('should register with specified Handlebars instance.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', array);

      assert(hbs.helpers.array === hbs.helpers.viaRegisterHelper);
    });
  });
});

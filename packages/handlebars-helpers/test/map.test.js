import assert from 'node:assert';
import Handlebars from 'handlebars';
import map, { register } from '../src/map.js';
import toJson from '../src/toJson.js';

const DEBUG = Boolean(process.env.DEBUG);

describe('{{map <key> [value] [<key> [value]] ...}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('map', map);
    hbs.registerHelper('toJson', toJson);
    template = hbs.compile(
      '{{{toJson (map key value key2 value2 key3 value3)}}}'
    );
  });

  context('if no arguments.', () => {
    it('should return an empty object.', () => {
      assert.deepEqual(map(), {});
      assert.deepEqual(template({}), '{}');
    });
  });

  context('if arguments are specified.', () => {
    it('should return an object.', () => {
      const cases = [
        [['key'], {}],
        [['key', ''], { key: '' }],
        [['key', 'value'], { key: 'value' }],
        [['key', 'value', 'key2', null], { key: 'value', key2: null }],
        [['key', 'value', 'key2', {}], { key: 'value', key2: {} }],
        [['key', 'value', 'key2', {}, 'key3'], { key: 'value', key2: {} }],
        [
          ['key', 'value', 'key2', {}, 'key3', [1, 2]],
          { key: 'value', key2: {}, key3: [1, 2] }
        ]
      ];

      cases.forEach(([args, expected]) => {
        {
          const actual = map(...args);

          if (DEBUG) {
            console.log('[DEBUG] map: %O => %O = %O', args, actual, expected);
          }

          assert(
            typeof actual === 'object' &&
              actual !== null &&
              !Array.isArray(actual)
          );
          assert.deepEqual(actual, expected);
        }
        {
          const [key, value, key2, value2, key3, value3] = args;
          const actual = template({ key, value, key2, value2, key3, value3 });

          if (DEBUG) {
            console.log(
              '[DEBUG] {{map}}: %O => %O = %O',
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
      hbs.registerHelper('viaRegisterHelper', map);

      assert(hbs.helpers.map === hbs.helpers.viaRegisterHelper);
    });
  });
});

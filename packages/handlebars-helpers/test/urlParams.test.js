import assert from 'node:assert';
import Handlebars from 'handlebars';
import urlParams, { register } from '../src/urlParams.js';

const DEBUG = Boolean(process.env.DEBUG);

describe('{{urlParams attrs}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('urlParams', urlParams);
    template = hbs.compile('{{urlParams attrs}}');
  });

  context('if no arguments.', () => {
    it('should return an empty safe string.', () => {
      assert.deepEqual(urlParams(), new Handlebars.SafeString(''));
      assert.deepEqual(template({}), '');
    });
  });

  context('if arguments are specified.', () => {
    it('should return a html attributes string.', () => {
      const cases = [
        [[{ empty: '' }], 'empty='],
        [[{ zero: 0 }], 'zero=0'],
        [[{ false: false }], 'false=false'],
        [
          [{ string: 'foo bar <b>baz</b>' }],
          'string=foo+bar+%3Cb%3Ebaz%3C%2Fb%3E'
        ],
        [[{ number: '900' }], 'number=900'],
        [
          [{ 'string-array': ['foo', 'bar', '<b>baz</b>', 900] }],
          'string-array=foo&string-array=bar&string-array=%3Cb%3Ebaz%3C%2Fb%3E&string-array=900'
        ],
        [
          [{ array: [['foo', 'bar', '<b>baz</b>', 900]] }],
          'array=%5B%5B%22foo%22%2C%22bar%22%2C%22%3Cb%3Ebaz%3C%2Fb%3E%22%2C900%5D%5D'
        ],
        [
          [{ object: { foo: true, bar: '<b>baz</b>', 900: false } }],
          'object=%7B%22900%22%3Afalse%2C%22foo%22%3Atrue%2C%22bar%22%3A%22%3Cb%3Ebaz%3C%2Fb%3E%22%7D'
        ],
        [[{ true: true }], 'true=true'],

        // multiple
        [
          [
            {
              foo: 'bar',
              baz: ['qux', 'quux'],
              corge: '<b>grault</b>',
              garply: { waldo: 'fred' },
              plugh: true
            }
          ],
          `foo=bar&baz=qux&baz=quux&corge=%3Cb%3Egrault%3C%2Fb%3E&garply=%7B%22waldo%22%3A%22fred%22%7D&plugh=true`
        ],

        // ignore values
        [[{ null: null }], ''],
        [[{ func: () => 'foo' }], '']
      ];

      cases.forEach(([args, expected]) => {
        {
          const actual = urlParams(...args);

          if (DEBUG) {
            console.log(
              '[DEBUG] urlParams: %O => %O = %O',
              args,
              actual,
              expected
            );
          }

          assert(actual instanceof Handlebars.SafeString);
          assert.deepEqual(actual, new Handlebars.SafeString(expected));
        }
        {
          const [attrs] = args;
          const actual = template({ attrs });

          if (DEBUG) {
            console.log(
              '[DEBUG] {{array}}: %O => %O = %O',
              args,
              actual,
              expected
            );
          }

          assert.equal(typeof actual, 'string');
          assert.equal(actual, expected);
        }
      });
    });
  });

  describe('register', () => {
    it('should register with specified Handlebars instance.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', urlParams);

      const attrs = {
        foo: 'bar',
        baz: true
      };

      assert.equal(
        hbs.compile('{{urlParams attrs}}')({ attrs }),
        hbs.compile('{{viaRegisterHelper attrs}}')({ attrs })
      );
    });
  });
});

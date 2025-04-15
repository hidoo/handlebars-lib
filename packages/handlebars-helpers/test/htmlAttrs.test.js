import assert from 'node:assert';
import Handlebars from 'handlebars';
import htmlAttrs, { register } from '../src/htmlAttrs.js';

const DEBUG = Boolean(process.env.DEBUG);

describe('{{htmlAttrs attrs}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('htmlAttrs', htmlAttrs);
    template = hbs.compile('{{htmlAttrs attrs}}');
  });

  context('if no arguments.', () => {
    it('should return an empty safe string.', () => {
      assert.deepEqual(htmlAttrs(), new Handlebars.SafeString(''));
      assert.deepEqual(template({}), '');
    });
  });

  context('if arguments are specified.', () => {
    it('should return a html attributes string.', () => {
      const cases = [
        [[{ empty: '' }], 'empty=""'],
        [[{ zero: 0 }], 'zero="0"'],
        [
          [{ string: 'foo bar <b>baz</b>' }],
          'string="foo bar &lt;b&gt;baz&lt;/b&gt;"'
        ],
        [[{ number: '900' }], 'number="900"'],
        [
          [{ 'string-array': ['foo', 'bar', '<b>baz</b>', 900] }],
          'string-array="foo bar &lt;b&gt;baz&lt;/b&gt; 900"'
        ],
        [
          [{ array: [['foo', 'bar', '<b>baz</b>', 900]] }],
          `array='[["foo","bar","&lt;b&gt;baz&lt;/b&gt;",900]]'`
        ],
        [
          [{ object: { foo: true, bar: '<b>baz</b>', 900: false } }],
          `object='{"900":false,"foo":true,"bar":"&lt;b&gt;baz&lt;/b&gt;"}'`
        ],
        [[{ true: true }], 'true'],

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
          `foo="bar" baz="qux quux" corge="&lt;b&gt;grault&lt;/b&gt;" garply='{"waldo":"fred"}' plugh`
        ],

        // ignore values
        [[{ null: null }], ''],
        [[{ func: () => 'foo' }], ''],
        [[{ false: false }], '']
      ];

      cases.forEach(([args, expected]) => {
        {
          const actual = htmlAttrs(...args);

          if (DEBUG) {
            console.log(
              '[DEBUG] htmlAttrs: %O => %O = %O',
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
      hbs.registerHelper('viaRegisterHelper', htmlAttrs);

      const attrs = {
        foo: 'bar',
        baz: true
      };

      assert.equal(
        hbs.compile('{{htmlAttrs attrs}}')({ attrs }),
        hbs.compile('{{viaRegisterHelper attrs}}')({ attrs })
      );
    });
  });
});

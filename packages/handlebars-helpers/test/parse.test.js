import assert from 'node:assert';
import Handlebars from 'handlebars';
import parse, { register } from '../src/parse.js';
import toJson from '../src/toJson.js';

const DEBUG = Boolean(process.env.DEBUG);

describe('{{parse value}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('parse', parse);
    hbs.registerHelper('toJson', toJson);
    template = hbs.compile('{{{toJson (parse value)}}}');
  });

  context('if no arguments.', () => {
    it('should return an empty object.', () => {
      assert.deepEqual(parse(), {});
      assert.equal(template({}), '{}');
    });
  });

  context('if <value> is specified.', () => {
    it('should return an inverted boolean.', () => {
      const cases = [
        [
          `
          hoge:
            fuga:
              - foo
              - bar
              - '{{hoge.fuga.[1]}}'
          `,
          { hoge: { fuga: ['foo', 'bar', 'bar'] } }
        ],
        [
          `
          {
            "hoge": {
              "fuga": [
                "foo",
                "bar",
                "{{hoge.fuga.[1]}}"
              ]
            }
          }
          `,
          { hoge: { fuga: ['foo', 'bar', 'bar'] } }
        ]
      ];

      cases.forEach(([value, expected]) => {
        {
          const actual = parse(value);

          if (DEBUG) {
            console.log('[DEBUG] not: %O => %O = %O', value, actual, expected);
          }

          assert.equal(typeof actual, 'object');
          assert.deepEqual(actual, expected);
        }
        {
          const actual = template({ value });

          if (DEBUG) {
            console.log(
              '[DEBUG] {{parse}}: %O => %O = %O',
              value,
              actual,
              expected
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
      hbs.registerHelper('viaRegisterHelper', parse);
      hbs.registerHelper('toJson', toJson);

      const value = `
      hoge:
        fuga:
          piyo:
            - foo
            - bar
            - baz
      `;

      assert.equal(
        hbs.compile('{{toJson (parse value)}}')({ value }),
        hbs.compile('{{toJson (viaRegisterHelper value)}}')({ value })
      );
    });
  });
});

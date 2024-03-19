import assert from 'node:assert';
import Handlebars from 'handlebars';
import truncate, { register } from '../src/truncate.js';

const DEBUG = Boolean(process.env.DEBUG);

describe("{{truncate <value> [length=<number>] [ellipsis='<string>']}}", () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('truncate', truncate);
    template = hbs.compile(
      '{{truncate value length=options.length ellipsis=options.ellipsis}}'
    );
  });

  context('if <value> is not defined.', () => {
    it('should throw TypeError.', () => {
      try {
        truncate();
      } catch (error) {
        assert(error instanceof TypeError);
      }
      try {
        template({});
      } catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  context('if arguments are specified.', () => {
    it('should return a truncated string.', () => {
      const str = 'aaaaaあああああbbbbbいいいいいcccccうううううddddd';
      const cases = [
        [[str], 'aaaaaあああああbbbbbいいいいいcccccうう...'],
        [[str, { length: 10 }], 'aaaaaああ...'],
        [
          [str, { ellipsis: '…' }],
          'aaaaaあああああbbbbbいいいいいcccccうううう…'
        ]
      ];

      cases.forEach(([args, expected]) => {
        const [value, options] = args;

        {
          const actual = truncate(value, { hash: options });

          if (DEBUG) {
            console.log('[DEBUG] array: %O => %O = %O', args, actual, expected);
          }

          assert(typeof actual === 'string');
          assert.deepEqual(actual, expected);
        }
        {
          const actual = template({ value, options });

          if (DEBUG) {
            console.log(
              '[DEBUG] {{array}}: %O => %O = %O',
              args,
              actual,
              JSON.stringify(expected)
            );
          }

          assert(typeof actual === 'string');
          assert.equal(actual, expected);
        }
      });
    });
  });

  describe('register', () => {
    it('should register with specified Handlebars instance.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', truncate);

      assert(hbs.helpers.truncate === hbs.helpers.viaRegisterHelper);
    });
  });
});

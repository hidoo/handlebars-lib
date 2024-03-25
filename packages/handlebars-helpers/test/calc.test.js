import assert from 'node:assert';
import Handlebars from 'handlebars';
import calc, { comparators, register } from '../src/calc.js';

const DEBUG = Boolean(process.env.DEBUG);

describe('{{calc <valueA> [operator] [valueB]}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('calc', calc);
    template = hbs.compile('{{calc valueA operator valueB}}');
  });

  context('if <valueA> is not defined.', () => {
    it('should throw TypeError.', () => {
      try {
        calc();
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

  context('if only <valueA> is specified.', () => {
    it('should return evaluated <valueA>.', () => {
      const cases = [
        [[0], false],
        [[1], true],
        [[''], false],
        [['true'], true],
        [[null], false]
      ];

      cases.forEach(([[valueA, operator, valueB], expected]) => {
        {
          const actual = calc(valueA, operator, valueB);

          assert(typeof actual === 'boolean');
          assert.equal(actual, expected);
        }
        {
          const actual = template({ valueA, operator, valueB });

          assert(typeof actual === 'string');
          assert.equal(actual, String(expected));
        }
      });
    });
  });

  context('if <valueA> and [valueB] are specified.', () => {
    it('should return result of comparing <valueA> and <valueB>.', () => {
      const cases = [
        [[0, 1], false],
        [[1, 1], true],
        [['', 0], false],
        [['true', 'true'], true],
        [[null, 0], false]
      ];

      cases.forEach(([[valueA, operator, valueB], expected]) => {
        {
          const actual = calc(valueA, operator, valueB);

          assert(typeof actual === 'boolean');
          assert.equal(actual, expected);
        }
        {
          const actual = template({ valueA, operator, valueB });

          assert(typeof actual === 'string');
          assert.equal(actual, String(expected));
        }
      });
    });
  });

  context('if <valueA>, [operator] and [valueB] are specified.', () => {
    it('should return result of comparing <valueA> and <valueB> with [operator].', () => {
      const cases = Object.entries(comparators).map(([operator, compare]) => [
        [[0, operator, 1], compare],
        [[1, operator, 1], compare],
        [['', operator, 0], compare],
        [['true', operator, 'true'], compare],
        [[[], operator, 1], compare],
        [[[1, 2], operator, 1], compare],
        [[{}, operator, 'key'], compare],
        [[{ key: 'value' }, operator, 'key'], compare],
        [[null, operator, 0], compare]
      ]);

      cases.forEach((casesByOperator) => {
        casesByOperator.forEach(([[valueA, operator, valueB], compare]) => {
          {
            const actual = calc(valueA, operator, valueB);

            if (DEBUG) {
              console.log(
                '[DEBUG] calc: %O %s %O => %O = %O',
                valueA,
                operator,
                valueB,
                actual,
                compare(valueA, valueB)
              );
            }

            assert.equal(actual, compare(valueA, valueB));
          }
          {
            const actual = template({ valueA, operator, valueB });

            if (DEBUG) {
              console.log(
                '[DEBUG] {{calc}}: %O %s %O => %O = %O',
                valueA,
                operator,
                valueB,
                actual,
                compare(valueA, valueB)
              );
            }

            assert(typeof actual === 'string');
            assert.equal(actual, String(compare(valueA, valueB)));
          }
        });
      });
    });
  });

  describe('register', () => {
    it('should register with specified Handlebars instance.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', calc);

      assert(hbs.helpers.calc === hbs.helpers.viaRegisterHelper);
    });
  });
});

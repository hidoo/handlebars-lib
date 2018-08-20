/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import ifModulo from '../src/ifModulo';

describe('{{#ifModulo value div rest}}...{{/ifModulo}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('ifModulo', ifModulo);
    template = hbs.compile('{{#ifModulo value div rest}}matched{{else}}not matched{{/ifModulo}}');
  });

  it('should throw TypeError if argument "value" is not number.', () => {
    const invalidValues = ['', '300', {}, () => {}];

    invalidValues.forEach((value) => {
      try {
        template({value, div: 1, rest: 1});
      }
      catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should throw TypeError if argument "div" is not number.', () => {
    const invalidDivs = ['', '300', {}, () => {}];

    invalidDivs.forEach((div) => {
      try {
        template({value: 1, div, rest: 1});
      }
      catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should throw TypeError if argument "rest" is not number.', () => {
    const invalidRests = ['', '300', {}, () => {}];

    invalidRests.forEach((rest) => {
      try {
        template({value: 1, div: 1, rest});
      }
      catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should throw Error if argument "div" is 0.', () => {
    try {
      template({value: 1, div: 0, rest: 1});
    }
    catch (error) {
      assert(error instanceof Error);
    }
  });

  it('should return "matched" if "value" % "div" === "rest".', () => {
    const values = [
      [1, 1, 0],
      [2, 1, 0],
      [3, 2, 1],
      [4, 3, 1],
      [4, 4, 0]
    ];

    values.forEach(([value, div, rest]) => {
      const result = template({value, div, rest});

      assert(typeof result === 'string');
      assert(result === 'matched');
    });
  });

  it('should return "matched" if "value" % "div" !== "rest".', () => {
    const values = [
      [1, 1, 1],
      [2, 1, 1],
      [3, 2, 0],
      [4, 3, 0],
      [4, 4, 1]
    ];

    values.forEach(([value, div, rest]) => {
      const result = template({value, div, rest});

      assert(typeof result === 'string');
      assert(result === 'not matched');
    });
  });

});

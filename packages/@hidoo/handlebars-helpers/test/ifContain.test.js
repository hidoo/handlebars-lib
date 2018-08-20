/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import ifContain from '../src/ifContain';

describe('{{#ifContain value test}}...{{/ifContain}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('ifContain', ifContain);
    template = hbs.compile('{{#ifContain value test}}contained{{else}}not contained{{/ifContain}}');
  });

  it('should throw TypeError if argument "value" is not set.', () => {
    try {
      template({});
    }
    catch (error) {
      assert(error instanceof TypeError);
    }
  });

  it('should throw TypeError if argument "value" is not valid. (must be string or array)', () => {
    const invalidValues = [0, 100, {}, () => {}];

    invalidValues.forEach((value) => {
      try {
        template({value});
      }
      catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should return "contained" if argument "value" is "value" and argument "test" is "alu".', () => {
    const value = 'value',
          test = 'alu',
          result = template({value, test});

    assert(typeof result === 'string');
    assert(result === 'contained');
  });

  it('should return "not contained" if argument "value" is "value" and argument "test" is "test".', () => {
    const value = 'value',
          test = 'test',
          result = template({value, test});

    assert(typeof result === 'string');
    assert(result === 'not contained');
  });

  it('should return "contained" if argument "value" is array and argument "test" is value of contained in array.', () => {
    const obj = {}, arr = [],
          value = ['', 'value', 0, 100, obj, arr],
          tests = ['', 'value', 0, 100, obj, arr];

    tests.forEach((test) => {
      const result = template({value, test});

      assert(typeof result === 'string');
      assert(result === 'contained');
    });
  });

  it('should return "not contained" if argument "value" is "value" and argument "test" is value of not contained in array.', () => {
    const value = ['', 'value', 0, 100, {}, []],
          tests = ['empty', 'val', 1, 101, {}, []];

    tests.forEach((test) => {
      const result = template({value, test});

      assert(typeof result === 'string');
      assert(result === 'not contained');
    });
  });
});

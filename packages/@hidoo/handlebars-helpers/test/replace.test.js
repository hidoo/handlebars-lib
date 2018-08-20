/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import replace from '../src/replace';

describe('{{replace value pattern replacement}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('replace', replace);
    template = hbs.compile('{{replace value pattern replacement}}');
  });

  it('should throw TypeError if argument "value" is not string.', () => {
    const invalidValues = [0, 100, [], {}, () => {}];

    invalidValues.forEach((value) => {
      try {
        template({value, pattern: '', replacement: ''});
      }
      catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should throw TypeError if argument "pattern" is not string.', () => {
    const invalidPatterns = [0, 100, [], {}, () => {}];

    invalidPatterns.forEach((pattern) => {
      try {
        template({value: '', pattern, replacement: ''});
      }
      catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should throw TypeError if argument "replacement" is not string.', () => {
    const invalidReplacements = [0, 100, [], {}, () => {}];

    invalidReplacements.forEach((replacement) => {
      try {
        template({value: '', pattern: '', replacement});
      }
      catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should return empty string if argument "value" is "" and arguument "pattern" is "".', () => {
    const result = template({value: '', pattern: ''});

    assert(typeof result === 'string');
    assert(result === '');
  });

  it('should return replaced string if arguments is valid and argument "pattern" is string.', () => {
    const values = [
      ['value. value. value', 'val', '', 'ue. value. value'],
      ['value. value. value', 'ue.', 'hoge.', 'valhoge. value. value'],
      ['value. value. value', '. ', '-', 'value-value. value']
    ];

    values.forEach(([value, pattern, replacement, expected]) => {
      const result = template({value, pattern, replacement});

      assert(typeof result === 'string');
      assert(result === expected);
    });
  });

  it('should return replaced string if arguments is valid and argument "pattern" is string like regex.', () => {
    const values = [
      ['value. value. value', '/^val/', '', 'ue. value. value'],
      ['value. value. value', '/value$/', 'hoge', 'value. value. hoge'],
      ['value. value. value', '/\\.\\s/', '-', 'value-value-value']
    ];

    values.forEach(([value, pattern, replacement, expected]) => {
      const result = template({value, pattern, replacement});

      assert(typeof result === 'string');
      assert(result === expected);
    });
  });

});

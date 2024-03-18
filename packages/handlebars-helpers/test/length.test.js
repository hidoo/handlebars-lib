import assert from 'node:assert';
import Handlebars from 'handlebars';
import length, { register } from '../src/length.js';

describe('{{length value}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('length', length);
    template = hbs.compile('{{length value}}');
  });

  it('should throw TypeError if argument "value" is not array or string.', () => {
    const invalidValues = [0, 100, {}, () => {}];

    invalidValues.forEach((value) => {
      try {
        template({ value });
      } catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should return length of string if argument "value" is string.', () => {
    const values = [
      ['', 0],
      ['value', 5]
    ];

    values.forEach(([value, expected]) => {
      const templateResult = template({ value });
      const functionResult = length(value);

      assert(typeof templateResult === 'string');
      assert(templateResult === expected.toString());
      assert(typeof functionResult === 'number');
      assert(functionResult === expected);
    });
  });

  it('should return length of array if argument "value" is array.', () => {
    const values = [
      [[], 0],
      [[0, 1, 2, 3, 4], 5]
    ];

    values.forEach(([value, expected]) => {
      const templateResult = template({ value });
      const functionResult = length(value);

      assert(typeof templateResult === 'string');
      assert(templateResult === expected.toString());
      assert(typeof functionResult === 'number');
      assert(functionResult === expected);
    });
  });

  describe('register', () => {
    it('should be registered.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', length);

      assert(hbs.helpers.length === hbs.helpers.viaRegisterHelper);
    });
  });
});

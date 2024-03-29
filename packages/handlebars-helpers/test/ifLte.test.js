import assert from 'node:assert';
import Handlebars from 'handlebars';
import ifLte, { register } from '../src/ifLte.js';

describe('{{#ifLte value test}}...{{/ifLte}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('ifLte', ifLte);
    template = hbs.compile(
      '{{#ifLte value test}}less than equel{{else}}not less than equel{{/ifLte}}'
    );
  });

  it('should throw TypeError if argument "value" is not set.', () => {
    try {
      template({});
    } catch (error) {
      assert(error instanceof TypeError);
    }
  });

  it('should throw TypeError if argument "value" is not valid. (must be string or number)', () => {
    const invalidValues = [[], {}, () => {}];

    invalidValues.forEach((value) => {
      try {
        template({ value });
      } catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should return comparison result if argument "value" is valid, but falsy. (0 or empty string)', () => {
    const validFaslyCases = [
      [0, 100, 'less than equel'],
      ['', 'a', 'less than equel']
    ];

    validFaslyCases.forEach(([value, test, expected]) => {
      const actual = template({ value, test });

      assert(actual === expected);
    });
  });

  it('should return "less than equel" if argument "value" is "a" and argument "test" is "b".', () => {
    const value = 'a',
      test = 'b',
      result = template({ value, test });

    assert(typeof result === 'string');
    assert(result === 'less than equel');
  });

  it('should return "not less than equel" if argument "value" is "b" and argument "test" is "a".', () => {
    const value = 'b',
      test = 'a',
      result = template({ value, test });

    assert(typeof result === 'string');
    assert(result === 'not less than equel');
  });

  it('should return "less than equel" if argument "value" is 1 and argument "test" is 100.', () => {
    const value = 1,
      test = 100,
      result = template({ value, test });

    assert(typeof result === 'string');
    assert(result === 'less than equel');
  });

  it('should return "not less than equel" if argument "value" is 100 and argument "test" is 1.', () => {
    const value = 100,
      test = 1,
      result = template({ value, test });

    assert(typeof result === 'string');
    assert(result === 'not less than equel');
  });

  describe('register', () => {
    it('should be registered.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', ifLte);

      assert(hbs.helpers.ifLte === hbs.helpers.viaRegisterHelper);
    });
  });
});

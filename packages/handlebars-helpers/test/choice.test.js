import assert from 'node:assert';
import Handlebars from 'handlebars';
import choice, { register } from '../src/choice.js';

describe('{{choice condition value fallback}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('choice', choice);
    template = hbs.compile('{{choice condition value fallback}}');
  });

  it('should return empty string if argument "condition" is "" and argument "fallback" is "".', () => {
    const templateResult = template({ condition: '', value: '', fallback: '' }),
      functionResult = choice('', '', '');

    assert(typeof templateResult === 'string');
    assert(templateResult === '');
    assert(typeof functionResult === 'string');
    assert(functionResult === '');
  });

  it('should return value of "value" if argument "condition" is not falsy value.', () => {
    const array = [],
      obj = {},
      func = () => {},
      values = [
        [true, 'value', 'fallback', 'value'],
        ['string value', 'value', 'fallback', 'value'],
        [100, 'value', 'fallback', 'value'],
        [array, 'value', 'fallback', 'value'],
        [obj, 'value', 'fallback', 'value'],
        [func, 'value', 'fallback', 'value']
      ];

    values.forEach(([condition, value, fallback, expected]) => {
      const templateResult = template({ condition, value, fallback }),
        functionResult = choice(condition, value, fallback);

      assert(typeof templateResult === 'string');
      assert(
        templateResult === Handlebars.escapeExpression(expected.toString())
      );
      assert(functionResult === expected);
    });
  });

  it('should return value of "fallback" if argument "condition" is falsy value.', () => {
    const values = [
      [false, 'value', 'fallback', 'fallback'],
      ['', 'value', 'fallback', 'fallback'],
      [NaN, 'value', 'fallback', 'fallback'],
      [undefined, 'value', 'fallback', 'fallback'], // eslint-disable-line no-undefined
      [null, 'value', 'fallback', 'fallback'],
      [0, 'value', 'fallback', 'fallback']
    ];

    values.forEach(([condition, value, fallback, expected]) => {
      const templateResult = template({ condition, value, fallback }),
        functionResult = choice(condition, value, fallback);

      assert(typeof templateResult === 'string');
      assert(
        templateResult === Handlebars.escapeExpression(expected.toString())
      );
      assert(functionResult === expected);
    });
  });

  describe('register', () => {
    it('should be registered.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', choice);

      assert(hbs.helpers.choice === hbs.helpers.viaRegisterHelper);
    });
  });
});

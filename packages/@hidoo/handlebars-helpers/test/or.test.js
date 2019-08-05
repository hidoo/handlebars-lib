/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import or from '../src/or';

describe('{{or value defaultValue}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('or', or);
    template = hbs.compile('{{or value defaultValue}}');
  });

  it('should return empty string if argument "value" is "" and argument "defaultValue" is "".', () => {
    const templateResult = template({value: '', defaultValue: ''}),
          functionResult = or('', '');

    assert(typeof templateResult === 'string');
    assert(templateResult === '');
    assert(typeof functionResult === 'string');
    assert(functionResult === '');
  });

  it('should return as it if argument "value" is not falsy value.', () => {
    const array = [],
          obj = {},
          func = () => {},
          values = [
            [true, 'default value', true],
            ['string value', 'default value', 'string value'],
            [100, 'default value', 100],
            [array, 'default value', array],
            [obj, 'default value', obj],
            [func, 'default value', func]
          ];

    values.forEach(([value, defaultValue, expected]) => {
      const templateResult = template({value, defaultValue}),
            functionResult = or(value, defaultValue);

      assert(typeof templateResult === 'string');
      assert(templateResult === Handlebars.escapeExpression(expected.toString()));
      assert(functionResult === expected);
    });
  });

  it('should return defaultValue if argument "value" is falsy value that not includes zero.', () => {
    const values = [
      [false, 'default value', 'default value'],
      ['', 'default value', 'default value'],
      [NaN, 'default value', 'default value'],
      [undefined, 'default value', 'default value'], // eslint-disable-line no-undefined
      [null, 'default value', 'default value'],
      [0, 'default value', 0]
    ];

    values.forEach(([value, defaultValue, expected]) => {
      const templateResult = template({value, defaultValue}),
            functionResult = or(value, defaultValue);

      assert(typeof templateResult === 'string');
      assert(templateResult === Handlebars.escapeExpression(expected.toString()));
      assert(functionResult === expected);
    });
  });

});

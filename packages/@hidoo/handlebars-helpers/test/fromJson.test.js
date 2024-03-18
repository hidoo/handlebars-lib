/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import fromJson, { register } from '../src/fromJson';
import toJson from '../src/toJson';

describe('{{fromJson value}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('fromJson', fromJson);
    hbs.registerHelper('toJson', toJson);
    template = hbs.compile('{{{toJson (fromJson value)}}}');
  });

  it('should return Javascript Object if argument "value" is valid.', () => {
    const values = [
      ['0', 0],
      ['"value"', 'value'],
      ['null', null],
      ['[0,1,2]', [0, 1, 2]],
      ['{"key1":"value1","key2":"value2"}', { key1: 'value1', key2: 'value2' }]
    ];

    values.forEach(([value, expected]) => {
      const templateResult = template({ value }),
        functionResult = fromJson(value);

      assert(templateResult === value);
      assert(typeof functionResult === typeof expected);
      assert.deepStrictEqual(functionResult, expected);
    });
  });

  describe('register', () => {
    it('should be registered.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', fromJson);

      assert(hbs.helpers.fromJson === hbs.helpers.viaRegisterHelper);
    });
  });
});

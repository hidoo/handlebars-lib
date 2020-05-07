/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import split, {register} from '../src/split';
import toJson from '../src/toJson';

describe('{{split array}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('split', split);
    hbs.registerHelper('toJson', toJson);
    template = hbs.compile('{{split value separator}}');
  });

  it('should throw TypeError if argument "value" is not string.', () => {
    const invalidValues = [0, 100, [], {}, () => {}];

    invalidValues.forEach((value) => {
      try {
        template({value});
      }
      catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should return array that splitted by argument "separator".', () => {
    const values = [
      ['', null, ''],
      ['0,1,2', null, '0,1,2'],
      ['0,1,2', ',', '0,1,2'],
      ['012', '', '0,1,2'],
      ['0-1-2', '-', '0,1,2'],

      // not splitted
      ['0+1+2', 'value', '0+1+2']
    ];

    values.forEach(([value, separator, expected]) => {
      const templateResult = template({value, separator}),
            functionResult = split(value, separator);

      assert(typeof templateResult === 'string');
      assert(templateResult === expected);
      assert(Array.isArray(functionResult));
      assert(functionResult.join(',') === expected);
    });
  });

  it('should return array that splitted by pattern specified by argument "separator".', () => {
    const values = [
      ['0, 1 ,2', '/\\s*,\\s*/', '0,1,2'],
      ['0value1ve2', '/v.*?e/', '0,1,2'],

      // // not splitted
      ['0+1+2', '/value/', '0+1+2']
    ];

    values.forEach(([value, separator, expected]) => {
      const templateResult = template({value, separator}),
            functionResult = split(value, separator);

      assert(typeof templateResult === 'string');
      assert(templateResult === expected);
      assert(Array.isArray(functionResult));
      assert(functionResult.join(',') === expected);
    });
  });

  describe('register', () => {
    it('should be registered.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', split);

      assert(hbs.helpers.split === hbs.helpers.viaRegisterHelper);
    });
  });
});

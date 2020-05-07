/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import ifMatch, {register} from '../src/ifMatch';

describe('{{#ifMatch value pattern}}...{{/ifMatch}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('ifMatch', ifMatch);
    template = hbs.compile('{{#ifMatch value pattern}}matched{{else}}not matched{{/ifMatch}}');
  });

  it('should throw TypeError if argument "value" is not string.', () => {
    const invalidValues = [0, '300', {}, () => {}];

    invalidValues.forEach((value) => {
      try {
        template({value, pattern: 'hoge'});
      }
      catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should throw TypeError if argument "pattern" is not string.', () => {
    const invalidPatterns = [0, '300', {}, () => {}];

    invalidPatterns.forEach((pattern) => {
      try {
        template({value: '', pattern});
      }
      catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should return "matched" if argument "value" is equal to argument "pattern".', () => {
    const values = [
      ['', ''],
      ['value', 'value']
    ];

    values.forEach(([value, pattern]) => {
      const result = template({value, pattern});

      assert(typeof result === 'string');
      assert(result === 'matched');
    });
  });

  it('should return "not matched" if argument "value" is not equal to argument "pattern".', () => {
    const values = [
      ['', 'value'],
      ['value', '']
    ];

    values.forEach(([value, pattern]) => {
      const result = template({value, pattern});

      assert(typeof result === 'string');
      assert(result === 'not matched');
    });
  });

  it('should return "matched" if argument "pattern" is string like regex and argument "value" is match argument "pattern".', () => {
    const values = [
      ['value', '/^v.+e$/']
    ];

    values.forEach(([value, pattern]) => {
      const result = template({value, pattern});

      assert(typeof result === 'string');
      assert(result === 'matched');
    });
  });

  it('should return "not matched" if argument "pattern" is string like regex and argument "value" is not match argument "pattern".', () => {
    const values = [
      ['eulav', '/^v.+e$/']
    ];

    values.forEach(([value, pattern]) => {
      const result = template({value, pattern});

      assert(typeof result === 'string');
      assert(result === 'not matched');
    });
  });

  describe('register', () => {
    it('should be registered.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', ifMatch);

      assert(hbs.helpers.ifMatch === hbs.helpers.viaRegisterHelper);
    });
  });
});

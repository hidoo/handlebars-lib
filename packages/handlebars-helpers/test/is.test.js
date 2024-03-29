import assert from 'node:assert';
import Handlebars from 'handlebars';
import is, { register } from '../src/is.js';

describe('{{#is value test}}...{{/is}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('is', is);
    template = hbs.compile(
      '{{#is value test}}matched{{else}}not matched{{/is}}'
    );
  });

  it('should return "matched" if arguments not set.', () => {
    const result = template({});

    assert(typeof result === 'string');
    assert(result === 'matched');
  });

  it('should return "matched" if argument "value" is "value" and argument "test" is "value".', () => {
    const value = 'value',
      test = value,
      result = template({ value, test });

    assert(typeof result === 'string');
    assert(result === 'matched');
  });

  it('should return "matched" if argument "value" is {} and argument "test" is same {}.', () => {
    const value = {},
      test = value,
      result = template({ value, test });

    assert(typeof result === 'string');
    assert(result === 'matched');
  });

  it('should return "not matched" if argument "value" is "value" and argument "test" is "test".', () => {
    const value = 'value',
      test = 'test',
      result = template({ value, test });

    assert(typeof result === 'string');
    assert(result === 'not matched');
  });

  describe('register', () => {
    it('should be registered.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', is);

      assert(hbs.helpers.is === hbs.helpers.viaRegisterHelper);
    });
  });
});

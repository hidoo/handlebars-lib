import assert from 'node:assert';
import Handlebars from 'handlebars';
import isnt, { register } from '../src/isnt.js';

describe('{{#isnt value test}}...{{/isnt}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('isnt', isnt);
    template = hbs.compile(
      '{{#isnt value test}}not matched{{else}}matched{{/isnt}}'
    );
  });

  it('should return "not matched" if arguments not set.', () => {
    const result = template({});

    assert(typeof result === 'string');
    assert(result === 'matched');
  });

  it('should return "matched" if argument "value" is "value" and argument "test" is "value".', () => {
    const value = 'value';
    const test = value;
    const result = template({ value, test });

    assert(typeof result === 'string');
    assert(result === 'matched');
  });

  it('should return "matched" if argument "value" is {} and argument "test" is same {}.', () => {
    const value = {};
    const test = value;
    const result = template({ value, test });

    assert(typeof result === 'string');
    assert(result === 'matched');
  });

  it('should return "not matched" if argument "value" is "value" and argument "test" is "test".', () => {
    const value = 'value';
    const test = 'test';
    const result = template({ value, test });

    assert(typeof result === 'string');
    assert(result === 'not matched');
  });

  describe('register', () => {
    it('should be registered.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', isnt);

      assert(hbs.helpers.isnt === hbs.helpers.viaRegisterHelper);
    });
  });
});

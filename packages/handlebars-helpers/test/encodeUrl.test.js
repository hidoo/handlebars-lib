import assert from 'node:assert';
import Handlebars from 'handlebars';
import encodeUrl, { register } from '../src/encodeUrl.js';

describe('{{encodeUrl value}}', () => {
  it('should return empty string if arguments is not set.', () => {
    const result = encodeUrl();

    assert(typeof result === 'string');
    assert(result === '');
  });

  it('should throw TypeError if argument "value" is not valid. (must be string)', () => {
    const invalidValues = [0, 100, {}, () => {}];

    invalidValues.forEach((value) => {
      try {
        encodeUrl(value);
      } catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should return encoded stringif argument "value" is valid.', () => {
    const values = ['text', '日本語', 'text?key=value+value2', 'text#hash'];

    values.forEach((value) => {
      const result = encodeUrl(value);

      assert(typeof result === 'string');
      assert(result === encodeURIComponent(value));
    });
  });

  describe('register', () => {
    it('should be registered.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', encodeUrl);

      assert(hbs.helpers.encodeUrl === hbs.helpers.viaRegisterHelper);
    });
  });
});

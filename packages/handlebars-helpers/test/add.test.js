import assert from 'node:assert';
import Handlebars from 'handlebars';
import add, { register } from '../src/add.js';

describe('{{add value addition}}', () => {
  it('should return 0 if arguments is not set.', () => {
    const result = add();

    assert(typeof result === 'number');
    assert(result === 0);
  });

  it('should be throw TypeError if argument "value" is NaN.', () => {
    try {
      add('', 0);
    } catch (error) {
      assert(error instanceof TypeError);
    }
  });

  it('should be throw TypeError if argument "addition" is NaN.', () => {
    try {
      add(0, {});
    } catch (error) {
      assert(error instanceof TypeError);
    }
  });

  it('should return 4 if argument "value" is 1 and argument "addition" is 3.', () => {
    const value = 1,
      addition = 3,
      result = add(value, addition);

    assert(typeof result === 'number');
    assert(result === 4);
  });

  it('should return 4 if argument "value" is string of "1" and argument "addition" is string of "3".', () => {
    const value = '1',
      addition = '3',
      result = add(value, addition);

    assert(typeof result === 'number');
    assert(result === 4);
  });

  describe('register', () => {
    it('should be registered.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', add);

      assert(hbs.helpers.add === hbs.helpers.viaRegisterHelper);
    });
  });
});

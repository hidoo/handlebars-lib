/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import add from '../src/add';

describe('{{add value addition}}', () => {

  it('should return 0 if arguments is not set.', () => {
    const result = add();

    assert(typeof result === 'number');
    assert(result === 0);
  });

  it('should be throw TypeError if argument "value" is NaN.', () => {
    try {
      add('', 0);
    }
    catch (error) {
      assert(error instanceof TypeError);
    }
  });

  it('should be throw TypeError if argument "addition" is NaN.', () => {
    try {
      add(0, {});
    }
    catch (error) {
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
});

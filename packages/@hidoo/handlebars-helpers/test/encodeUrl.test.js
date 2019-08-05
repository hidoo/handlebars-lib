/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import encodeUrl from '../src/encodeUrl';

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
      }
      catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should throw TypeError if argument "value" is not valid. (must be string)', () => {
    const values = ['text', '日本語', 'text?key=value+value2', 'text#hash'];

    values.forEach((value) => {
      const result = encodeUrl(value);

      assert(typeof result === 'string');
      assert(result === encodeURIComponent(value));
    });
  });
});

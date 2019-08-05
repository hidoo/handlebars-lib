/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import basename from '../src/basename';

describe('{{basename value}}', () => {

  it('should return empty string if arguments is not set.', () => {
    const result = basename();

    assert(typeof result === 'string');
    assert(result === '');
  });

  it('should be throw TypeError if argument "value" is not string.', () => {
    try {
      basename({});
    }
    catch (error) {
      assert(error instanceof TypeError);
    }
  });

  it('should return "hoge" if argument "value" is "hoge".', () => {
    const result = basename('hoge');

    assert(typeof result === 'string');
    assert(result === 'hoge');
  });

  it('should return "basename" if argument "value" is "basename.txt".', () => {
    const result = basename('basename.txt');

    assert(typeof result === 'string');
    assert(result === 'basename');
  });

  it('should return "basename" if argument "value" is "directory/basename.txt".', () => {
    const result = basename('directory/basename.txt');

    assert(typeof result === 'string');
    assert(result === 'basename');
  });

  it('should return "basename" if argument "value" is "basename.txt#hash".', () => {
    const result = basename('basename.txt#hash');

    assert(typeof result === 'string');
    assert(result === 'basename');
  });

  it('should return "basename" if argument "value" is "basename.txt?key=value".', () => {
    const result = basename('basename.txt?key=value');

    assert(typeof result === 'string');
    assert(result === 'basename');
  });

  it('should return "basename" if argument "value" is "directory/basename.txt?key=value#hash".', () => {
    const result = basename('directory/basename.txt?key=value#hash');

    assert(typeof result === 'string');
    assert(result === 'basename');
  });
});

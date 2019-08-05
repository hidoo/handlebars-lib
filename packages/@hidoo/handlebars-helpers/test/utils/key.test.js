/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import {normalize, followRecursive} from '../../src/utils/key';

describe('utils/key', () => {

  describe('normalize', () => {

    it('should return as it is if argument "key" is not string.', () => {
      const keys = [null, 0, [], {}, () => {}];

      keys.forEach((key) => assert(normalize(key) === key));
    });

    it('should return array of keys if argument "key" is string.', () => {
      const values = [
        ['prop', ['prop']],
        ['prop1.prop2', ['prop1', 'prop2']],
        ['prop1.[0].prop2', ['prop1', 0, 'prop2']],
        ['prop1.[object Object].prop2', ['prop1', '[object Object]', 'prop2']]
      ];

      values.forEach(([key, expected]) => {
        const result = normalize(key);

        assert(Array.isArray(result));
        assert.deepStrictEqual(result, expected);
      });
    });
  });

  describe('followRecursive', () => {

    it('should return undefined if arguments is not set.', () => {
      const result = followRecursive();

      assert(result === undefined); // eslint-disable-line no-undefined
    });

    it('should throw TypeError if argument "obj" is not object.', () => {
      const invalidValues = [null, 0, '', [], () => {}];

      invalidValues.forEach((value) => {
        try {
          followRecursive(value);
        }
        catch (error) {
          assert(error instanceof TypeError);
        }
      });
    });

    it('should throw TypeError if argument "keys" is not array.', () => {
      const invalidValues = [null, 0, '', {}, () => {}];

      invalidValues.forEach((value) => {
        try {
          followRecursive({}, value);
        }
        catch (error) {
          assert(error instanceof TypeError);
        }
      });
    });

    it('should return value of the specified key if arguments is valid.', () => {
      const values = [
        [{prop: 'value1'}, ['prop'], 'value1'],
        [{prop1: {prop2: 'value2'}}, ['prop1', 'prop2'], 'value2'],
        [{prop1: [{prop2: 'value3'}]}, ['prop1', 0, 'prop2'], 'value3']
      ];

      values.forEach(([obj, keys, expected]) => {
        const result = followRecursive(obj, keys);

        assert(result === expected);
      });
    });

    it('should return undefined if argument "key" is properties that do not exist.', () => {
      const values = [
        [{prop: 'value1'}, ['notExist']],
        [{prop1: {prop2: 'value2'}}, ['prop1', 'notExist']],
        [{prop1: [{prop2: 'value3'}]}, ['prop1', 100, 'prop2']]
      ];

      values.forEach(([obj, keys]) => {
        const result = followRecursive(obj, keys);

        assert(result === undefined); // eslint-disable-line no-undefined
      });
    });
  });
});

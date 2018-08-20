/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import filterArray from '../src/filterArray';
import toJson from '../src/toJson';

describe('{{filterArray array key=key value=value}}', () => {
  let template = null,
      templateToJson = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('filterArray', filterArray);
    hbs.registerHelper('toJson', toJson);
    template = hbs.compile('{{filterArray array key=options.key value=options.value}}');
    templateToJson = hbs.compile('{{{toJson (filterArray array key=options.key value=options.value)}}}');
  });

  it('should throw TypeError if argument "array" is not array.', () => {
    const invalidValues = [0, 100, {}, () => {}];

    invalidValues.forEach((value) => {
      try {
        template({value});
      }
      catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should return new array if argument "array" is empty array or argument "value" is falsy.', () => {
    const values = [
      [[], 'prop', ''],
      [[0, 1, 2], '', '0,1,2'],
      [[0, 1, 2], null, '0,1,2']
    ];

    values.forEach(([array, value, expected]) => {
      const templateResult = template({array, options: {value}}),
            functionResult = filterArray(array, {hash: {value}});

      assert(typeof templateResult === 'string');
      assert(templateResult === expected);
      assert(Array.isArray(functionResult));
      assert(functionResult !== array);
      assert(functionResult.join(',') === array.join(','));
    });
  });

  it('should return new array that filtered by specified value if argument "array" and attribute "value" are valid.', () => {
    const values = [
      [[], 'value', []],
      [['value1', 'value2', 'value3'], 'value1', ['value1']],
      [[0, 1, 2], 3, []],
      [[0, 1, 2], 1, [1]]
    ];

    values.forEach(([array, value, expected]) => {
      const templateResult = template({array, options: {value}}),
            functionResult = filterArray(array, {hash: {value}});

      assert(typeof templateResult === 'string');
      assert(templateResult === expected.join(','));
      assert(Array.isArray(functionResult));
      assert(functionResult !== array);
      assert(functionResult.join(',') === expected.join(','));
    });
  });

  it('should return new array that filtered by specified key if argument "array" and attribute "key" are valid.', () => {
    const objectKey = {},
          arrayKey = [],
          values = [
            [[{[objectKey]: 'value1'}, {[objectKey]: 'value2'}, {[objectKey]: 'value3'}], 'value3', objectKey, 2],
            [[{[arrayKey]: 'value1'}, {[arrayKey]: 'value2'}, {[arrayKey]: 'value3'}], 'value3', arrayKey, 2],
            [[{prop1: 'value1'}, {prop1: 'value2'}, {prop1: 'value3'}], 'value3', 'prop1', 2],
            [[{prop1: {prop2: 'value1'}}, {prop1: {prop2: 'value2'}}, {prop1: {prop2: 'value3'}}], 'value1', 'prop1.prop2', 0],
            [[{prop1: [{}, {prop2: 'value1'}]}, {prop1: [{}, {prop2: 'value2'}]}, {prop1: [{}, {prop2: 'value3'}]}], 'value2', 'prop1.[1].prop2', 1]
          ];

    values.forEach(([array, value, key, expectedIndex]) => {
      const templateResult = templateToJson({array, options: {value, key}}),
            functionResult = filterArray(array, {hash: {value, key}});

      assert(typeof templateResult === 'string');
      assert(templateResult === JSON.stringify([array[expectedIndex]]));
      assert(Array.isArray(functionResult));
      assert(functionResult !== array);
      assert.deepStrictEqual(functionResult, [array[expectedIndex]]);
    });
  });
});

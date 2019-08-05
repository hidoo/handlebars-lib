/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import sortArray from '../src/sortArray';
import toJson from '../src/toJson';

describe('{{sortArray array}}', () => {
  let template = null,
      templateToJson = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('sortArray', sortArray);
    hbs.registerHelper('toJson', toJson);
    template = hbs.compile('{{sortArray array order=options.order key=options.key }}');
    templateToJson = hbs.compile('{{{toJson (sortArray array order=options.order key=options.key)}}}');
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

  it('should return new array if argument "array" is empty array or attribute "order" is falsy.', () => {
    const values = [
      [[], 'ascend', ''],
      [[0, 1, 2], '', '0,1,2'],
      [[0, 1, 2], null, '0,1,2']
    ];

    values.forEach(([array, order, expected]) => {
      const templateResult = template({array, options: {order}}),
            functionResult = sortArray(array, {hash: {order}});

      assert(typeof templateResult === 'string');
      assert(templateResult === expected);
      assert(Array.isArray(functionResult));
      assert(functionResult !== array);
      assert(functionResult.join(',') === array.join(','));
    });
  });

  it('should return new array that sorted by specified order if argument "array" and attribute "order" are valid.', () => {
    const values = [
      [['value1', 'value2', 'value3'], null, ['value1', 'value2', 'value3']],
      [['value1', 'value2', 'value3'], 'ascend', ['value1', 'value2', 'value3']],
      [['value1', 'value2', 'value3'], 'descend', ['value3', 'value2', 'value1']],
      [[0, 1, 2], null, [0, 1, 2]],
      [[0, 1, 2], 'ascend', [0, 1, 2]],
      [[0, 1, 2], 'descend', [2, 1, 0]]
    ];

    values.forEach(([array, order, expected]) => {
      const templateResult = template({array, options: {order}}),
            functionResult = sortArray(array, {hash: {order}});

      assert(typeof templateResult === 'string');
      assert(templateResult === expected.join(','));
      assert(Array.isArray(functionResult));
      assert(functionResult !== array);
      assert(functionResult.join(',') === expected.join(','));
    });
  });

  it('should return new array that sorted by specified key if argument "array" and attribute "key" are valid.', () => {
    const objectKey = {},
          arrayKey = [],
          values = [
            [[{[objectKey]: 'value1'}, {[objectKey]: 'value2'}, {[objectKey]: 'value3'}], 'descend', objectKey, [{[objectKey]: 'value3'}, {[objectKey]: 'value2'}, {[objectKey]: 'value1'}]],
            [[{[arrayKey]: 'value1'}, {[arrayKey]: 'value2'}, {[arrayKey]: 'value3'}], 'descend', arrayKey, [{[arrayKey]: 'value3'}, {[arrayKey]: 'value2'}, {[arrayKey]: 'value1'}]],
            [[{prop1: 'value1'}, {prop1: 'value2'}, {prop1: 'value3'}], 'descend', 'prop1', [{prop1: 'value3'}, {prop1: 'value2'}, {prop1: 'value1'}]],
            [[{prop1: {prop2: 'value1'}}, {prop1: {prop2: 'value2'}}, {prop1: {prop2: 'value3'}}], 'descend', 'prop1.prop2', [{prop1: {prop2: 'value3'}}, {prop1: {prop2: 'value2'}}, {prop1: {prop2: 'value1'}}]],
            [[{prop1: [{}, {prop2: 'value1'}]}, {prop1: [{}, {prop2: 'value2'}]}, {prop1: [{}, {prop2: 'value3'}]}], 'descend', 'prop1.[1].prop2', [{prop1: [{}, {prop2: 'value3'}]}, {prop1: [{}, {prop2: 'value2'}]}, {prop1: [{}, {prop2: 'value1'}]}]]
          ];

    values.forEach(([array, order, key, expected]) => {
      const templateResult = templateToJson({array, options: {order, key}}),
            functionResult = sortArray(array, {hash: {order, key}});

      assert(typeof templateResult === 'string');
      assert(templateResult === JSON.stringify(expected));
      assert(Array.isArray(functionResult));
      assert(functionResult !== array);
      assert.deepStrictEqual(functionResult, expected);
    });
  });
});

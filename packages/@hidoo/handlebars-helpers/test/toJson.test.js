/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import toJson from '../src/toJson';

describe('{{toJson value prettify=true}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('toJson', toJson);
    template = hbs.compile('{{{toJson value prettify=options.prettify}}}');
  });

  it('should return JSON string if argument "value" is valid.', () => {
    const values = [
      [0, '0'],
      ['value', '"value"'],
      [null, 'null'],
      [[0, 1, 2], '[0,1,2]'],
      [{key1: 'value1', key2: 'value2'}, '{"key1":"value1","key2":"value2"}'],
      [{[{}]: 'value1', [[]]: 'value2'}, '{"[object Object]":"value1","":"value2"}']
    ];

    values.forEach(([value, expected]) => {
      const result = template({value});

      assert(typeof result === 'string');
      assert(result === expected);
    });
  });

  it('should return prettify JSON string if attribute "prettify" is truthy.', () => {
    const values = [
      [0, '0'],
      ['value', '"value"'],
      [null, 'null'],
      [[0, 1, 2], '[\n  0,\n  1,\n  2\n]'],
      [{key1: 'value1', key2: 'value2'}, '{\n  "key1": "value1",\n  "key2": "value2"\n}'],
      [{[{}]: 'value1', [[]]: 'value2'}, '{\n  "[object Object]": "value1",\n  "": "value2"\n}']
    ];

    values.forEach(([value, expected]) => {
      const result = template({value, options: {prettify: true}});

      assert(typeof result === 'string');
      assert(result === expected);
    });
  });
});

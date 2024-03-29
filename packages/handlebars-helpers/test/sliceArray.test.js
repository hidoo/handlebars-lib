import assert from 'node:assert';
import Handlebars from 'handlebars';
import sliceArray, { register } from '../src/sliceArray.js';

describe('{{sliceArray array start end}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('sliceArray', sliceArray);
    template = hbs.compile('{{sliceArray array start end}}');
  });

  it('should throw TypeError if argument "array" is not array.', () => {
    const invalidValues = [0, 100, {}, () => {}];

    invalidValues.forEach((value) => {
      try {
        template({ value });
      } catch (error) {
        assert(error instanceof TypeError);
      }
    });
  });

  it('should return new array.', () => {
    const values = [
      [[], 0, null, ''],
      [[0, 1, 2], 0, null, '0,1,2'],
      [[0, 1, 2, 3, 4], 0, null, '0,1,2,3,4']
    ];

    values.forEach(([array, start, end, expected]) => {
      const templateResult = template({ array, start, end });
      const functionResult = sliceArray(array, start, end);

      assert(typeof templateResult === 'string');
      assert(templateResult === expected);
      assert(Array.isArray(functionResult));
      assert(functionResult !== array);
      assert(functionResult.join(',') === array.join(','));
    });
  });

  it('should return sliced array if argument "start" is number.', () => {
    const values = [
      [[], 0, null, ''],
      [[0, 1, 2], 1, null, '1,2'],
      [[0, 1, 2, 3, 4], 3, null, '3,4']
    ];

    values.forEach(([array, start, end, expected]) => {
      const templateResult = template({ array, start, end });
      const functionResult = sliceArray(array, start, end);

      assert(typeof templateResult === 'string');
      assert(templateResult === expected);
      assert(Array.isArray(functionResult));
    });
  });

  it('should return sliced array if argument "start" and "end" are number.', () => {
    const values = [
      [[], 0, null, ''],
      [[0, 1, 2], 1, 2, '1'],
      [[0, 1, 2, 3, 4], 1, 4, '1,2,3']
    ];

    values.forEach(([array, start, end, expected]) => {
      const templateResult = template({ array, start, end });
      const functionResult = sliceArray(array, start, end);

      assert(typeof templateResult === 'string');
      assert(templateResult === expected);
      assert(Array.isArray(functionResult));
    });
  });

  describe('register', () => {
    it('should be registered.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', sliceArray);

      assert(hbs.helpers.sliceArray === hbs.helpers.viaRegisterHelper);
    });
  });
});

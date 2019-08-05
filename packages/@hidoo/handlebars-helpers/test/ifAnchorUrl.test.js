/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import ifAnchorUrl from '../src/ifAnchorUrl';

describe('{{#ifAnchorUrl value}}...{{/if}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('ifAnchorUrl', ifAnchorUrl);
    template = hbs.compile('{{#ifAnchorUrl value}}anchor url{{else}}not anchor url{{/ifAnchorUrl}}');
  });

  it('should throw TypeError if argument "value" is not string.', () => {
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

  it('should return "not anchor url" if argument "value" is not set.', () => {
    const result = template({});

    assert(typeof result === 'string');
    assert(result === 'not anchor url');
  });

  it('should return "not anchor url" if argument "value" is not "anchor url".', () => {
    const values = [
      ['text', 'not anchor url'],
      ['https://example.com/', 'not anchor url'],
      ['https://example.com/path/to', 'not anchor url'],
      ['https://example.com/path/to/index.html', 'not anchor url'],
      ['https://example.com/path/to/index.html?key=value', 'not anchor url']
    ];

    values.forEach(([value, expected]) => {
      const result = template({value});

      assert(typeof result === 'string');
      assert(result === expected);
    });
  });

  it('should return "anchor url" if argument "value" is "anchor url".', () => {
    const values = [
      ['https://example.com/#anchor-name', 'anchor url'],
      ['https://example.com/path/to/#anchor-name', 'anchor url'],
      ['https://example.com/path/to/index.html#anchor-name', 'anchor url'],
      ['https://example.com/path/to/index.html?key=value#anchor-name', 'anchor url']
    ];

    values.forEach(([value, expected]) => {
      const result = template({value});

      assert(typeof result === 'string');
      assert(result === expected);
    });
  });

});

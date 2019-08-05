/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import convertBreaks from '../src/convertBreaks';

describe('{{convertBreaks value}}', () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('convertBreaks', convertBreaks);
    template = hbs.compile('{{convertBreaks value}}');
  });

  it('should throw TypeError if argument "value" is not valid. (must be string)', () => {
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

  it('should return empty string if argument "value" is not set.', () => {
    const result = template({});

    assert(typeof result === 'string');
    assert(result === '');
  });

  it('should return "<p>value value value.</p>" if argument "value" is "value value value.".', () => {
    const value = 'value value value.',
          result = template({value});

    assert(typeof result === 'string');
    assert(result === '<p>value value value.</p>');
  });

  it('should return "<p>value value value.</p>" if argument "value" is "<p>value value value.".', () => {
    const value = '<p>value value value.',
          result = template({value});

    assert(typeof result === 'string');
    assert(result === '<p>value value value.</p>');
  });

  it('should return "<p>value value value.</p>" if argument "value" is "value value value.</p>".', () => {
    const value = 'value value value.</p>',
          result = template({value});

    assert(typeof result === 'string');
    assert(result === '<p>value value value.</p>');
  });

  it('should return "<p>value<br />value<br />value.</p>" if argument "value" is "value\\nvalue\\nvalue.".', () => {
    const value = 'value\nvalue\nvalue.',
          result = template({value});

    assert(typeof result === 'string');
    assert(result === '<p>value<br />value<br />value.</p>');
  });

  it('should return "<p>value</p><p>value<br />value.</p>" if argument "value" is "value\\n\\n\\nvalue\\nvalue.".', () => {
    const value = 'value\n\n\nvalue\nvalue.',
          result = template({value});

    assert(typeof result === 'string');
    assert(result === '<p>value</p><p>value<br />value.</p>');
  });

});

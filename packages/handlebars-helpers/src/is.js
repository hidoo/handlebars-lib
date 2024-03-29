import deprecated from './utils/deprecated.js';

/**
 * 完全一致
 *
 * @deprecated since version 1.1.0
 * @param {Any} value 元の値
 * @param {Any} test 比較する値
 * @param {Object} options Handlebars のオプション
 * @return {String}
 */
export default function is(value, test, options) {
  deprecated('is', 'calc', "{{#if (calc a '===' b)}} ... {{/if}}");

  const self = this; // eslint-disable-line no-invalid-this

  if (value === test) {
    return options.fn(self);
  }
  return options.inverse(self);
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('is', is);
}

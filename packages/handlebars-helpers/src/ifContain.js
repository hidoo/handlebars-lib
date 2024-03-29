import deprecated from './utils/deprecated.js';

/**
 * 文字列、配列に対象の含まれているかどうかでの条件分岐をする
 * + 配列の場合、配列やオブジェクトの比較はそれ自身が同一か否かまで比較
 *
 * @deprecated since version 1.1.0
 * @param {String|Array} value 元の値
 * @param {Any} test 比較する値
 * @param {Object} options Handlebars のオプション
 * @return {String}
 */
export default function ifContain(value, test, options) {
  deprecated('ifContain', 'calc', "{{#if (calc a 'has' b)}} ... {{/if}}");

  const self = this; // eslint-disable-line no-invalid-this

  if (!value) {
    throw new TypeError('{{#ifContain}}: Argument "value" is required.');
  }
  if (typeof value !== 'string' && !Array.isArray(value)) {
    throw new TypeError(
      '{{#ifContain}}: Argument "value" is not valid. (must be string or array)'
    );
  }

  if (value.includes(test)) {
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
  handlebars.registerHelper('ifContain', ifContain);
}

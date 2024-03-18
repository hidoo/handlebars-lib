/**
 * 元の値が比較する値以下であるかどうかでの条件分岐をする
 *
 * @param {String|Number} value 元の値
 * @param {String|Number} test 比較する値
 * @param {Object} options Handlebars のオプション
 * @return {String}
 */
export default function ifLte(value, test, options) {
  const self = this; // eslint-disable-line no-invalid-this

  // eslint-disable-next-line no-magic-numbers
  if (!value && value !== 0 && value !== '') {
    throw new TypeError('{{#ifLte}}: Argument "value" is required.');
  }
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new TypeError(
      '{{#ifLte}}: Argument "value" is not valid. (must be string or array).'
    );
  }

  if (value <= test) {
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
  handlebars.registerHelper('ifLte', ifLte);
}

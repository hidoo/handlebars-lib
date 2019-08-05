/**
 * 元の値が比較する値以下であるかどうかでの条件分岐をする
 * @param {String|Number} value 元の値
 * @param {String|Number} test 比較する値
 * @param {Object} options Handlebars のオプション
 * @return {String}
 */
export default function ifLte(value, test, options) {
  const self = this; // eslint-disable-line no-invalid-this

  if (!value && value !== 0 && value !== '') { // eslint-disable-line no-magic-numbers
    throw new TypeError('{{#ifLte}}: Argument "value" is required.');
  }
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new TypeError('{{#ifLte}}: Argument "value" is not valid. (must be string or array).'); // eslint-disable-line max-len
  }

  if (value <= test) {
    return options.fn(self);
  }
  return options.inverse(self);
}

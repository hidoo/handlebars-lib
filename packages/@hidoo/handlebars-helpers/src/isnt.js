/**
 * 完全不一致
 * @param {Any} value 元の値
 * @param {Any} test 比較する値
 * @param {Object} options Handlebars のオプション
 * @return {String}
 */
export default function isnt(value, test, options) {
  const self = this; // eslint-disable-line no-invalid-this

  if (value !== test) {
    return options.fn(self);
  }
  return options.inverse(self);
}

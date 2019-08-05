/**
 * 割った時の余りが指定した値の時に条件分岐をする
 *
 * ```
 * {{#ifModulo value 3 1}}value が 3 で割って 1 余る時{{/ifModulo}}
 * ```
 *
 * @param {Number} value 比較する値
 * @param {Number} div 割る値
 * @param {Number} rest あまりの値
 * @param {Object} options Handlebars のオプション
 * @return {String}
 */
export default function ifModulo(value, div, rest, options) { // eslint-disable-line max-params
  const self = this; // eslint-disable-line no-invalid-this

  if (typeof value !== 'number') {
    throw new TypeError('{{#ifModulo}}: Argument "value" is not number.');
  }
  if (typeof div !== 'number') {
    throw new TypeError('{{#ifModulo}}: Argument "div" is not number.');
  }
  if (div === 0) { // eslint-disable-line no-magic-numbers
    throw new Error('{{#ifModulo}}: Argument "div" is 0.');
  }
  if (typeof rest !== 'number') {
    throw new TypeError('{{#ifModulo}}: Argument "rest" is not number.');
  }

  if (value % div === rest) {
    return options.fn(self);
  }
  return options.inverse(self);
}

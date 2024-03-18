/**
 * 加算
 *
 * @param {Number|String} value 元の値
 * @param {Number|String} addition 加算する値
 * @return {Number}
 */
// eslint-disable-next-line no-magic-numbers
export default function add(value = 0, addition = 0) {
  let normalizedValue = value,
    normalizedAddition = addition;

  if (typeof normalizedValue === 'string') {
    normalizedValue = parseInt(value, 10);
  }
  if (typeof normalizedAddition === 'string') {
    normalizedAddition = parseInt(addition, 10);
  }

  if (isNaN(normalizedValue)) {
    throw new TypeError('{{add}}: Argument "value" is not valid.');
  }
  if (isNaN(normalizedAddition)) {
    throw new TypeError('{{add}}: Argument "addition" is not valid.');
  }

  return normalizedValue + normalizedAddition;
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('add', add);
}

/**
 * return length of array or string
 *
 * @param {Array|String} value target value
 * @return {Number}
 */
export default function length(value) {
  if (typeof value !== 'string' && !Array.isArray(value)) {
    throw new TypeError('{{length}}: Argument "value" must be string or array.');
  }
  return value.length;
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('length', length);
}

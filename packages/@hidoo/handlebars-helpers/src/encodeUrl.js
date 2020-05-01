/**
 * URI エンコード
 *
 * @param {String} value 値
 * @return {String}
 */
export default function encodeUrl(value = '') {
  if (typeof value !== 'string') {
    throw new TypeError('{{encodeUrl}}: Argument "value" is not string.');
  }
  return encodeURIComponent(value);
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('encodeUrl', encodeUrl);
}

/**
 * split string to array
 *
 * @param {String} value value
 * @param {String} separator separator string
 * @return {Any|Array}
 */
export default function split(value, separator = ',') {
  if (typeof value !== 'string') {
    throw new TypeError('{{split}}: Argument "value" must be string.');
  }
  if (/^\/.+\/$/.test(separator)) {
    const regex = new RegExp(separator.replace(/(^\/|\/$)/g, ''), 'g'); // eslint-disable-line prefer-named-capture-group

    return value.split(regex);
  }
  return value.split(separator);
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('split', split);
}

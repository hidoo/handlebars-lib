/**
 * conditional branch if condition is match or not
 *
 * @param {String} value return value if condition is truesy
 * @param {String} pattern return value if condition is not falsy
 * @param {Object} options options of Handlebars
 * @return {String}
 */
export default function ifMatch(value, pattern, options) {
  const self = this; // eslint-disable-line no-invalid-this

  if (typeof value !== 'string') {
    throw new TypeError('{{ifMatch}}: Argument "value" is not string.');
  }
  if (typeof pattern !== 'string') {
    throw new TypeError('{{ifMatch}}: Argument "pattern" is not string.');
  }

  if (/^\/.+\/$/.test(pattern)) {
    const regex = new RegExp(pattern.replace(/(^\/|\/$)/g, '')); // eslint-disable-line prefer-named-capture-group

    if (regex.test(value)) {
      return options.fn(self);
    }
    return options.inverse(self);
  } else if (value === pattern) {
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
  handlebars.registerHelper('ifMatch', ifMatch);
}

/**
 * Default length
 *
 * @type {Number}
 */
const defaultLength = 30;

/**
 * truncate string
 *
 * @param {String} value value
 * @param {Object} options options of Handlebars
 * @return {String}
 *
 * @example ```hbs
 * {{truncate value length=20 ellipsis='...' }}
 * ```
 */
export default function truncate(value, options = {}) {
  if (typeof value !== 'string') {
    throw new TypeError('{{truncate}}: Argument #1 "value" must be string.');
  }

  const ellipsis = options?.hash?.ellipsis || '...';
  const length = (options?.hash?.length || defaultLength) - ellipsis.length;

  // eslint-disable-next-line no-magic-numbers
  return value.trim().slice(0, length) + ellipsis;
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('truncate', truncate);
}

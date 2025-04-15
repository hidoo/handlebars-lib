import comparators from './utils/comparators.js';

/**
 * calculate specified values
 *
 * @param {Any} valueA value
 * @param {Array<Any>} args arguments
 * @return {Boolean}
 *
 * @example ```hbs
 * {{calc valueA '===' valueB}}
 * ```
 */
export default function calc(valueA, ...args) {
  if (typeof valueA === 'undefined') {
    throw new TypeError('{{calc}}: Argument #1 is required.');
  }

  // eslint-disable-next-line no-magic-numbers
  const [operator, valueB] = args.length >= 2 ? args : ['===', ...args];

  if (typeof valueB === 'undefined') {
    return Boolean(valueA);
  }

  const compare =
    typeof comparators[operator] === 'function'
      ? comparators[operator]
      : () => false;

  return compare(valueA, valueB);
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('calc', calc);
}

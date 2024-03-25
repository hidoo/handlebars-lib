/* eslint id-length: off */

/**
 * mapping operator to comparator
 *
 * @type {Object}
 */
export const comparators = {
  '===': (a, b) => a === b,
  '!==': (a, b) => a !== b,
  /* eslint-disable eqeqeq */
  '==': (a, b) => a == b,
  '!=': (a, b) => a != b,
  /* eslint-enable eqeqeq */
  '>=': (a, b) => a >= b,
  '>': (a, b) => a > b,
  '<=': (a, b) => a <= b,
  '<': (a, b) => a < b,
  '=~': (a, b) => a?.toString().match(new RegExp(b)) !== null,
  '!~': (a, b) => a?.toString().match(new RegExp(b)) === null,
  '&&': (a, b) => Boolean(a && b),
  '||': (a, b) => Boolean(a || b),
  has(a, b) {
    if (typeof a === 'string' || Array.isArray(a)) {
      return a.includes(b);
    } else if (a && typeof a === 'object') {
      return Boolean(a[b]);
    }
    return false;
  },
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b
};

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

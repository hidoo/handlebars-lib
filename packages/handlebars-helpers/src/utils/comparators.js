/* eslint id-length: off */

/**
 * mapping operator to comparator
 *
 * @type {Object}
 */
const comparators = {
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

export default comparators;

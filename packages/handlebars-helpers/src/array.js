/**
 * make array
 *
 * @param {Array<Any>} args arguments
 * @return {Array}
 *
 * @example ```hbs
 * {{array value value2 ...}}
 * ```
 */
export default function array(...args) {
  return args.filter(
    (arg) =>
      typeof arg !== 'undefined' &&
      !(typeof arg === 'object' && typeof arg?.lookupProperty === 'function')
  );
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('array', array);
}

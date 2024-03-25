/**
 * map keys and values
 *
 * @param {Array<String|Any>} args arguments
 * @return {Object}
 *
 * @example ```hbs
 * {{map 'key' value 'key2' value2 ...}}
 * ```
 */
export default function map(...args) {
  const size = 2;
  const entries = args
    .filter(
      (arg) =>
        !(typeof arg === 'object' && typeof arg?.lookupProperty === 'function')
    )
    .reduce((chunked, current, index) => {
      if (index % size) {
        return chunked;
      }
      return [...chunked, args.slice(index, index + size)];
    }, []);

  return entries.reduce((object, [key, value]) => {
    if (typeof value === 'undefined') {
      return object;
    }
    return {
      ...object,
      [key]: value
    };
  }, {});
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('map', map);
}

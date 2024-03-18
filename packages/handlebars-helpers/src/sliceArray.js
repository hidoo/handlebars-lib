/**
 * return sliced array
 *
 * @param {Array} [array=[]] target array
 * @param {Number} start start index
 * @param {Number} end end index
 * @return {Array}
 *
 * @example ```hbs
 * {{#each (sliceArray array 0 11)}}..{{/each}}
 * ```
 */
// eslint-disable-next-line no-magic-numbers
export default function sliceArray(array = [], start = 0, end = 0) {
  if (!Array.isArray(array)) {
    throw new TypeError('{{sliceArray}}: Argument "array" is not array.');
  }

  if (typeof start === 'number' && typeof end === 'number') {
    return array.slice(start, end);
  } else if (typeof start === 'number' && typeof end !== 'number') {
    return array.slice(start);
  }
  return array.slice();
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('sliceArray', sliceArray);
}

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
export default function sliceArray(array = [], start = 0, end = 0) { // eslint-disable-line no-magic-numbers
  if (!Array.isArray(array)) {
    throw new TypeError('{{sliceArray}}: Argument "array" is not array.');
  }

  if (typeof start === 'number' && typeof end === 'number') {
    return array.slice(start, end);
  }
  else if (typeof start === 'number' && typeof end !== 'number') {
    return array.slice(start);
  }
  return array.slice();
}

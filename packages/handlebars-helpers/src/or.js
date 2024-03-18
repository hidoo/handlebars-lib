/**
 * return default value if value is falsy value
 *
 * @param {Number|String} value value
 * @param {Number|String} defaultValue default value
 * @return {Any}
 */
export default function or(value, defaultValue) {
  if (value) {
    return value;
    // eslint-disable-next-line no-magic-numbers
  } else if (value === 0) {
    return value;
  }
  return defaultValue || '';
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('or', or);
}

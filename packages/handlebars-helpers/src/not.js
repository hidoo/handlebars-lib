/**
 * return inverted boolean
 *
 * @param {Any} value value
 * @return {Boolean}
 *
 * @example ```hbs
 * {{#if (not value)}} ... {{/if}}
 * ```
 */
export default function not(value) {
  return !value;
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('not', not);
}

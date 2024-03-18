/**
 * choice according to conditions
 *
 * @param {Any} condition choice condition
 * @param {Any} value return value if condition is truesy
 * @param {Any} fallback return value if condition is not falsy
 * @return {Any}
 */
export default function choice(condition, value, fallback) {
  if (condition) {
    return value;
  }
  return fallback || '';
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('choice', choice);
}

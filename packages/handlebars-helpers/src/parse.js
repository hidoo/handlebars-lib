import Handlebars from 'handlebars';
import { fromString } from '@hidoo/data-from';

/**
 * Wrapper of fromString
 *
 * @param {String} value JSON, JSON5, or YAML string
 * @param {Object} options options
 * @param {HandlebarsEnvironment} options.handlebars options Handlebars instance
 * @return {Object}
 */
function wrappedFromString(value, options = {}) {
  try {
    return fromString(value, options);
  } catch (error) {
    throw new Error(`{{parse}}: ${error}`);
  }
}

/**
 * Parse data from JSON, JSON5 or YAML
 *
 * @param {String} value JSON, JSON5, or YAML string
 * @return {Object}
 */
export default function parse(value) {
  return wrappedFromString(value, { handlebars: Handlebars });
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('parse', (value) =>
    wrappedFromString(value, { handlebars })
  );
}

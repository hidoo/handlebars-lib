import Handlebars from 'handlebars';

/**
 * Return value is string or number whether or not.
 *
 * @param {*} val value
 * @return {Boolean}
 */
const isStringOrNumberOrBoolean = (val) =>
  typeof val === 'string' ||
  typeof val === 'number' ||
  typeof val === 'boolean';

/**
 * Return value is array or object whether or not.
 *
 * @param {*} val value
 * @return {Boolean}
 */
const isArrayOrObject = (val) => typeof val === 'object' && val !== null;

/**
 * Build URL parameters
 *
 * @param {Object} params parameter pairs
 * @param {Object} options options
 * @param {HandlebarsEnvironment} options.handlebars options Handlebars instance
 * @return {String}
 */
function buildUrlParams(params, options = {}) {
  if (!(isArrayOrObject(params) && !Array.isArray(params))) {
    throw new TypeError('{{calc}}: Argument #1 params must be object.');
  }

  const opts = {
    handlebars: Handlebars,
    ...options
  };
  const { SafeString } = opts.handlebars;
  const parameters = new URLSearchParams();

  Object.entries(params).forEach(([attr, value]) => {
    if (isStringOrNumberOrBoolean(value)) {
      parameters.append(attr, value);
      return;
    }
    if (Array.isArray(value) && value.every(isStringOrNumberOrBoolean)) {
      value.forEach((val) => {
        parameters.append(attr, val);
      });
      return;
    }
    if (isArrayOrObject(value)) {
      parameters.append(attr, JSON.stringify(value));
    }
  });

  return new SafeString(parameters.toString());
}

/**
 * Returns URL parameters string
 *
 * @param {Object} params parameter pairs
 * @return {String}
 *
 * @example ```hbs
 * {{urlParams params}}
 * ```
 */
export default function urlParams(params = {}) {
  return buildUrlParams(params, { handlebars: Handlebars });
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('urlParams', (attrs) =>
    buildUrlParams(attrs, { handlebars })
  );
}

import Handlebars from 'handlebars';

/**
 * Return value is string or number whether or not.
 *
 * @param {*} val value
 * @return {Boolean}
 */
const isStringOrNumber = (val) =>
  typeof val === 'string' || typeof val === 'number';

/**
 * Return value is array or object whether or not.
 *
 * @param {*} val value
 * @return {Boolean}
 */
const isArrayOrObject = (val) => typeof val === 'object' && val !== null;

/**
 * Build html attributes
 *
 * @param {Object} attrs attribute pairs
 * @param {Object} options options
 * @param {HandlebarsEnvironment} options.handlebars options Handlebars instance
 * @return {String}
 */
function buildHtmlAttrs(attrs, options = {}) {
  if (!(isArrayOrObject(attrs) && !Array.isArray(attrs))) {
    throw new TypeError('{{calc}}: Argument #1 attrs must be object.');
  }

  const opts = {
    handlebars: Handlebars,
    ...options
  };
  const { escapeExpression, SafeString } = opts.handlebars;

  const attributes = Object.entries(attrs).map(([attr, value]) => {
    if (isStringOrNumber(value)) {
      return `${escapeExpression(attr)}="${escapeExpression(value)}"`;
    }
    if (Array.isArray(value) && value.every(isStringOrNumber)) {
      return `${escapeExpression(attr)}="${escapeExpression(value.join(' '))}"`;
    }
    if (isArrayOrObject(value)) {
      const json = JSON.stringify(value, (key, val) => {
        if (typeof val === 'string') {
          return escapeExpression(val);
        }
        return val;
      });

      return `${escapeExpression(attr)}='${json}'`;
    }
    if (value === true) {
      return escapeExpression(attr);
    }
    return null;
  });

  return new SafeString(attributes.filter((attr) => attr !== null).join(' '));
}

/**
 * Returns html attributes string
 *
 * @param {Object} attrs attribute pairs
 * @return {String}
 *
 * @example ```hbs
 * {{htmlAttrs attrs}}
 * ```
 */
export default function htmlAttrs(attrs = {}) {
  return buildHtmlAttrs(attrs, { handlebars: Handlebars });
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('htmlAttrs', (attrs) =>
    buildHtmlAttrs(attrs, { handlebars })
  );
}

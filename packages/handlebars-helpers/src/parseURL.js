import Handlebars from 'handlebars';

/**
 * Properties
 *
 * @type {Array<String>}
 */
const props = [
  'hash',
  'host',
  'hostname',
  'href',
  'origin',
  'password',
  'pathname',
  'port',
  'protocol',
  'search',
  'searchParams',
  'username'
];

/**
 * Parse URL from string
 *
 * @param {String} url URL string
 * @param {Object} options options of Handlebars
 * @return {Object}
 *
 * @example ```hbs
 * {{parseURL url base='https://example.com/'}}
 * ```
 */
export default function parseURL(url, options) {
  const { base } = options?.hash || {};

  try {
    const newURL = new URL(url, base);

    return props
      .map((prop) => {
        if (prop === 'searchParams') {
          const searchParams = {};

          for (const [key, value] of newURL[prop].entries()) {
            searchParams[key] = value;
          }

          return [prop, searchParams];
        }
        return [prop, newURL[prop]];
      })
      .reduce((prev, [prop, value]) => {
        return {
          ...prev,
          [prop]: value
        };
      }, {});
  } catch (error) {
    Handlebars.log('info', `{{parseURL}}: ${error}`);
    return {};
  }
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('parseURL', parseURL);
}

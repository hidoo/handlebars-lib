import Handlebars from 'handlebars';

/**
 * Print deprecated warning.
 *
 * @param {String} name deprecated helper name
 * @param {String} instead alternative helper name
 * @param {String} example migration example
 * @return {void}
 */
export default function deprecated(name, instead, example = '') {
  Handlebars.log(
    'warn',
    `DEPRECATED: {{${name}}} helper is deprecated.`,
    instead ? `Use {{${instead}}} helper instead.` : '',
    example ? `ex: ${example}` : ''
  );
}

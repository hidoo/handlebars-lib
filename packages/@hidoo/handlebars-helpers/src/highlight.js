/**
 * import modules
 */
import hljs from 'highlight.js';

/**
 * シンタックスハイライトを適用する
 *
 * @param {String} value 値
 * @param {Object} options Handlebars のオプション
 * @return {String}
 *
 * @example ```hbs
 * {{highlight value lang='html'}}
 * ```
 */
export default function highlight(value, options) {
  const lang = options.hash.lang || 'html';

  // eslint-disable-next-line no-magic-numbers
  if (!value && value !== 0) {
    return '';
  }
  if (typeof value !== 'string') {
    return String(value);
  }
  return hljs.highlight(value, { language: lang }).value;
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('highlight', highlight);
}

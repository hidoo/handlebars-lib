/**
 * import modules
 */
import hljs from 'highlight.js';

/**
 * シンタックスハイライトを適用する
 * @param {String} value 値
 * @param {Object} options Handlebars のオプション
 * @return {String}
 *
 * @example
 * {{highlight value lang='html'}}
 */
export default function highlight(value, options) {
  const lang = options.hash.lang || 'html';

  if (!value && value !== 0) { // eslint-disable-line no-magic-numbers
    return '';
  }
  if (typeof value !== 'string') {
    return String(value);
  }
  return hljs.highlight(lang, value).value;
}

/**
 * import modules
 */
import marked from 'marked';

/**
 * Markdown 文字列をパースする
 * @param {Object} options Handlebars のオプション
 * @return {String}
 */
export default function markdown(options) {
  const self = this; // eslint-disable-line no-invalid-this

  return marked(options.fn(self));
}

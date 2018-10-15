/**
 * import modules
 */
import marked from 'marked';
import hljs from 'highlight.js';

/**
 * Markdown 文字列をパースする
 * @param {Object} options Handlebars のオプション
 * @return {String}
 */
export default function markdown(options) {
  const self = this, // eslint-disable-line no-invalid-this
        content = options.fn(self);

  if (typeof content !== 'string') {
    return content;
  }
  return marked(content, {
    highlight: (code, lang) => hljs.highlight(lang || 'html', code).value
  });
}

/**
 * import modules
 */
import marked from 'marked';
import hljs from 'highlight.js';

/**
 * escape html mappings
 *
 * @type {Object}
 */
const MAPPING_ESCAPE_HTML_STRINGS = {
  '<': '&#60;',
  '>': '&#62;',
  '"': '&#34;',
  "'": '&#39;',
  '&': '&#38;'
};

/**
 * return escaped html code
 *
 * @param {String} html html code
 * @return {String}
 */
function escape(html = '') {
  if ((/[&<>"']/).test(html)) {
    return html.replace(/[<>"'&]/g, (match) => MAPPING_ESCAPE_HTML_STRINGS[match]);
  }
  return html;
}

/**
 * configure new Renderer
 *
 * @return {Renderer}
 */
function configureRenderer() {
  const renderer = new marked.Renderer();

  /**
   * extend code block
   *
   * @param {String} content content of code
   * @param {String} lang language
   * @param {Boolean} escaped escape or not
   * @return {String}
   *
   * {@link https://github.com/markedjs/marked/blob/a5b93085d223652badedf70b3d5e3a4b263b7de9/lib/marked.js#L918-L939}
   */
  renderer.code = function code(content, lang, escaped) {
    const {langPrefix, highlight} = this.options;
    let newContent = content,
        newEscaped = escaped;

    if (typeof highlight === 'function') {
      const out = highlight(newContent, lang);

      if (out !== null && out !== newContent) {
        newEscaped = true;
        newContent = out;
      }
    }

    newContent = newEscaped ? newContent : escape(content);

    if (!lang) {
      return `<pre><code class="hljs">${newContent}</code></pre>\n`;
    }
    return `<pre><code class="hljs ${langPrefix}${escape(lang)}">${newContent}</code></pre>\n`;
  };

  return renderer;
}

/**
 * Markdown 文字列をパースする
 *
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
    highlight: (code, lang) => hljs.highlight(code, {language: lang || 'html'}).value,
    renderer: configureRenderer()
  });
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('markdown', markdown);
}

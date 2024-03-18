import { Marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

/**
 * Markdown 文字列をパースする
 *
 * @param {Object} options Handlebars のオプション
 * @return {String}
 */
export default function markdown(options) {
  const self = this; // eslint-disable-line no-invalid-this
  const content = options.fn(self);

  if (typeof content !== 'string') {
    return content;
  }

  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  marked.use(gfmHeadingId());

  return marked.parse(content);
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

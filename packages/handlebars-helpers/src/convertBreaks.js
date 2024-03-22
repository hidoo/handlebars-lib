import Handlebars from 'handlebars';
import deprecated from './utils/deprecated.js';

/**
 * マッチングパターン
 *
 * @type {RegExp}
 */
const PATTERN_START_PARAGRAPH = /^<p>/;
const PATTERN_END_PARAGRAPH = /<\/p>$/;
const PATTERN_END_PARAGRAPH_BR = /<br \/><\/p>/g;
const PATTERN_SINGLE_LINE_FEEDS = /(?<!\n)\n(?!\n)/g;
const PATTERN_MULTI_LINE_FEEDS = /\n\n+/g;

/**
 * 改行を含む文字列を本文用にマークアップする変換処理
 *
 * @deprecated since version 1.1.0
 * @param {Number} value 本文用のテキスト
 * @param {Handlebars} handlebars Handlebars instance
 * @return {String}
 */
function convert(value = '', handlebars = Handlebars) {
  deprecated('convertBreaks');

  if (typeof value !== 'string') {
    throw new TypeError('{{convertBreaks}}: Argument "value" is not string.');
  }
  if (value === '') {
    return value;
  }

  // 段落の整形
  // + 単独の改行は、<br /> に変換する
  // + 2 行以上の改行は、</p>\n<p> に変換する
  // + 改行文字で分割して配列に変換する
  const paragraphs = value
    .replace(PATTERN_SINGLE_LINE_FEEDS, '<br />')
    .replace(PATTERN_MULTI_LINE_FEEDS, '</p>\n<p>')
    .split('\n')
    .map((line) => {
      const hasStartParagraphTag = PATTERN_START_PARAGRAPH.test(line);
      const hasEndParagraphTag = PATTERN_END_PARAGRAPH.test(line);

      // 始まりにも終わりにも <p> がない場合は <br /> を追加
      if (!hasStartParagraphTag && !hasEndParagraphTag) {
        return `${line}<br />`;
      }
      return line;
    });

  // 行を連結
  let html = paragraphs.join('');

  // 全体が <p> で始まらない場合 <p> を追加する
  if (!PATTERN_START_PARAGRAPH.test(html)) {
    html = `<p>${html}`;
  }
  // 全体が </p> で終わらない場合 </p> を追加する
  if (!PATTERN_END_PARAGRAPH.test(html)) {
    html = `${html}</p>`;
  }

  // <br /></p> は </p> に変換
  return new handlebars.SafeString(
    html.replace(PATTERN_END_PARAGRAPH_BR, '</p>')
  );
}

/**
 * 改行を含む文字列を本文用にマークアップする
 *
 * @param {Number} value 本文用のテキスト
 * @return {String}
 */
export default function convertBreaks(value = '') {
  return convert(value, Handlebars);
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('convertBreaks', (value = '') =>
    convert(value, handlebars)
  );
}

/**
 * パスのベースネームを返す
 * + クエリ文字列、フラグメントは除去する
 * + 拡張子は除去する
 *
 * @param {String} value パス文字列
 * @return {String}
 */
export default function basename(value = '') {
  if (typeof value !== 'string') {
    throw new TypeError('{{basename}}: Argument "path" is not string.');
  }

  const lastIndex = -1;
  const url = new URL(value, 'data://');
  const filename = url.pathname.split('/').at(lastIndex);
  const ext = filename.split('.').at(lastIndex);

  if (typeof ext === 'string' && ext !== '') {
    return filename.replace(new RegExp(`.${ext}$`), '');
  }
  return filename;
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('basename', basename);
}

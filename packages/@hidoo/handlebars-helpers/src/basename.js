/**
 * import modules
 */
import path from 'path-browserify';

/**
 * パスのベースネームを返す
 * + クエリ文字列、フラグメントは除去する
 * + 拡張子は除去する
 * @param {String} value パス文字列
 * @return {String}
 */
export default function basename(value = '') {
  if (typeof value !== 'string') {
    throw new TypeError('{{basename}}: Argument "path" is not string.');
  }

  const tmpPath = value.replace(/(\?|#).*$/g, ''),
        ext = path.extname(tmpPath);

  if (typeof ext === 'string' && ext !== '') {
    return path.basename(tmpPath, ext);
  }
  return path.basename(tmpPath);
}

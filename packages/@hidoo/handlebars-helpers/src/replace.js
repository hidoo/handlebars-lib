/**
 * 文字列の置換
 * + 引数 pattern が / デリミタで囲まれている場合、正規表現として扱う
 * @param {String} value 対象の値
 * @param {String} pattern 正規表現
 * @param {String} replacement 置換対象の値
 * @return {String}
 */
export default function replace(value = '', pattern, replacement = '') {
  if (typeof value !== 'string') {
    throw new TypeError('{{replace}}: Argument "value" is not string.');
  }
  if (typeof pattern !== 'string') {
    throw new TypeError('{{replace}}: Argument "pattern" is not string.');
  }
  if (typeof replacement !== 'string') {
    throw new TypeError('{{replace}}: Argument "replacement" is not string.');
  }
  if (value === '' || pattern === '') {
    return value;
  }

  if ((/^\/.+\/$/).test(pattern)) {
    const regex = new RegExp(pattern.replace(/(^\/|\/$)/g, ''), 'g');

    return value.replace(regex, replacement);
  }
  return value.replace(pattern, replacement);
}

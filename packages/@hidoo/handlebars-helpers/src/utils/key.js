/**
 * キー文字列を正規化する
 * + Handlebars のプロパティ指定の記述に対応
 * + . で分割する
 * + [数値] 形式の値は、数値のみを抜き出して Number 型に変換する
 * @param  {String|Any} key キー文字列
 * @return {Array|Any}
 */
export function normalize(key) {
  if (typeof key !== 'string') {
    return key;
  }
  return key.split('.').map((keyStr) => {
    if ((/^\[\d+\]$/).test(keyStr)) {
      return parseInt(keyStr.replace(/^\[|\]$/g, ''), 10);
    }
    return keyStr;
  });
}

/**
 * オブジェクトのキーを再帰的にたどり最終的な値を取得する
 * @param {Object} obj 対象のオブジェクト
 * @param {Array} keys キーの配列
 * @return {Any}
 */
export function followRecursive(obj = {}, keys = []) {
  if (obj === null || typeof obj !== 'object') {
    throw new TypeError('followRecursive: Argument "obj" is not object.');
  }
  if (!keys || !Array.isArray(keys)) {
    throw new TypeError('followRecursive: Argument "keys" is not array.');
  }

  const [key, ...restKeys] = keys,
        value = obj[key];

  // 有効な値の場合に再帰処理する
  if (value && typeof value === 'object') {
    return followRecursive(value, restKeys);
  }
  return value;
}

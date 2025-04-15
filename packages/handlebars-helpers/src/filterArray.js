import comparators from './utils/comparators.js';
import { normalize, followRecursive } from './utils/key.js';

/**
 * フィルタリングした新しい配列を返す
 *
 * @param {Array} array 配列
 * @param {Object} options Handlebars のオプション
 * @return {Array}
 */
export default function filterArray(array = [], options = {}) {
  const { value, key, operator } = options.hash;

  if (!Array.isArray(array)) {
    throw new TypeError('{{filterArray}}: Argument "array" is not array.');
  }

  const compare =
    typeof comparators[operator] === 'function'
      ? comparators[operator]
      : comparators['==='];

  // array が空の配列の場合、
  // または value の指定がない場合は新しい配列にして返す
  if (!array.length || !value) {
    return [...array];
  }

  // key の指定がない場合は、値が条件に一致したものだけを返す
  if (!key) {
    return array.filter((item) => compare(item, value));
  }

  // key が文字列ではない場合の対応
  // + 文字列以外の値をプロパティに持っている場合はその値で比較し、
  //   それ以外の場合は該当しないものとみなす
  if (typeof key !== 'string') {
    return array.filter((item) => {
      if (item[key]) {
        return compare(item[key], value);
      }
      return false;
    });
  }

  // キーの正規化
  const keys = normalize(key);

  // key を辿って目的の値を再帰的に取り出して比較し、
  // マッチするものだけを返す
  return array.filter((item) => compare(followRecursive(item, keys), value));
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('filterArray', filterArray);
}

/**
 * import modules
 */
import {normalize, followRecursive} from './utils/key';

/**
 * ソート関数（昇順）
 * @param {Any} a 比較するアイテム
 * @param {Any} b 比較するアイテム
 * @return {Boolean}
 */
function sortAscend(a, b) {
  /* eslint-disable no-magic-numbers */
  if (a < b) {
    return -1;
  }
  else if (a > b) {
    return 1;
  }
  return 0;
  /* eslint-enable no-magic-numbers */
}

/**
 * ソート関数（昇順）
 * @param {Any} a 比較するアイテム
 * @param {Any} b 比較するアイテム
 * @return {Boolean}
 */
function sortDescend(a, b) {
  /* eslint-disable no-magic-numbers */
  if (a > b) {
    return -1;
  }
  else if (a < b) {
    return 1;
  }
  return 0;
  /* eslint-enable no-magic-numbers */
}

/**
 * ソートしたした新しい配列を返す
 * @param {Array} array 配列
 * @param {Object} options Handlebars のオプション
 * @return {Array}
 */
export default function sortArray(array = [], options) {
  const {order, key} = options.hash;

  if (!Array.isArray(array)) {
    throw new TypeError('{{sortArray}}: Argument "array" is not array.');
  }

  // array が空の配列の場合は新しい配列にして返す
  if (!array.length) {
    return [...array];
  }

  // ソート用の比較関数の設定
  const comparator = order === 'descend' ? sortDescend : sortAscend;

  // key の指定がない場合は単純に値をソートして返す
  if (!key) {
    return [...array].sort(comparator);
  }

  // key が文字列ではない場合の対応
  // + 文字列以外の値をプロパティに持っている値のみをフィルタリングし、
  //   その中でソートを行なって返す
  if (typeof key !== 'string') {
    return [...array].filter((item) => item[key])
      .sort((a, b) => comparator(a[key], b[key]));
  }

  // キーの正規化
  const keys = normalize(key);

  // key を辿って目的の値を再帰的に取り出して比較し、ソートする
  // + 該当する key がないものは事前にフィルタリングする
  return [...array].filter((item) => followRecursive(item, keys))
    .sort((a, b) => comparator(followRecursive(a, keys), followRecursive(b, keys)));
}

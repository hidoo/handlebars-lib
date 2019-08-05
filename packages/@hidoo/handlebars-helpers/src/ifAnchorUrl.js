/**
 * マッチングパターン
 * @type {RegExp}
 */
const PATTERN_ANCHOR_URL = /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?#([^?=:,./"'&].+)$/; // eslint-disable-line max-len

/**
 * リンクに関する値を受け取り、アンカーリンクか否かで条件分岐する
 *
 * ```
 * {{#ifAnchorUrl value}}アンカーリンクの時の処理{{/ifAnchorUrl}}
 * ```
 *
 * @param {String} value 対象の値
 * @param {Object} options Handlebars のオプション
 * @return {String}
 */
export default function ifAnchorUrl(value = '', options) {
  const self = this; // eslint-disable-line no-invalid-this

  if (typeof value !== 'string') {
    throw new TypeError('{{#ifAnchorUrl}}: Argument "value" is not string.');
  }

  if (PATTERN_ANCHOR_URL.test(value)) {
    return options.fn(self);
  }
  return options.inverse(self);
}

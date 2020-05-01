/**
 * マッチングパターン
 *
 * @type {RegExp}
 */
const PATTERN_ANCHOR_URL = /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?#([^?=:,./"'&].+)$/; // eslint-disable-line max-len, prefer-named-capture-group

/**
 * リンクに関する値を受け取り、アンカーリンクか否かで条件分岐する
 *
 * @param {String} value 対象の値
 * @param {Object} options Handlebars のオプション
 * @return {String}
 *
 * @example ```hbs
 * {{#ifAnchorUrl value}}アンカーリンクの時の処理{{/ifAnchorUrl}}
 * ```
 */
export default function ifAnchorUrl(value = '', options = {}) {
  const self = this; // eslint-disable-line no-invalid-this

  if (typeof value !== 'string') {
    throw new TypeError('{{#ifAnchorUrl}}: Argument "value" is not string.');
  }

  if (PATTERN_ANCHOR_URL.test(value)) {
    return options.fn(self);
  }
  return options.inverse(self);
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('ifAnchorUrl', ifAnchorUrl);
}

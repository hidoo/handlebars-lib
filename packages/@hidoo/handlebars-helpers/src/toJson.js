/**
 * JSON 文字列に変換する
 *
 * @param {Any} value 値
 * @param {Object} options Handlebars のオプション
 * @return {String}
 */
export default function toJson(value, options) {
  const {prettify} = options.hash;

  try {
    return JSON.stringify(value, null, prettify ? '  ' : null);
  }
  catch (error) {
    throw new Error(`{{toJson}}: ${error}`);
  }
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('toJson', toJson);
}

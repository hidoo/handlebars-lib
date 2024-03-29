/**
 * JSON 文字列を変数に変換する
 *
 * @param {String} value JSON 文字列
 * @return {Any}
 */
export default function fromJson(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`{{fromJson}}: ${error}`);
  }
}

/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export function register(handlebars) {
  handlebars.registerHelper('fromJson', fromJson);
}

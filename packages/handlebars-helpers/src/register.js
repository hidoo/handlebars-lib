import { register as add } from './add.js';
import { register as array } from './array.js';
import { register as basename } from './basename.js';
import { register as calc } from './calc.js';
import { register as choice } from './choice.js';
import { register as convertBreaks } from './convertBreaks.js';
import { register as encodeUrl } from './encodeUrl.js';
import { register as filterArray } from './filterArray.js';
import { register as fromJson } from './fromJson.js';
import { register as highlight } from './highlight.js';
import { register as htmlAttrs } from './htmlAttrs.js';
import { register as ifAnchorUrl } from './ifAnchorUrl.js';
import { register as ifContain } from './ifContain.js';
import { register as ifLte } from './ifLte.js';
import { register as ifMatch } from './ifMatch.js';
import { register as ifModulo } from './ifModulo.js';
import { register as is } from './is.js';
import { register as isnt } from './isnt.js';
import { register as length } from './length.js';
import { register as map } from './map.js';
import { register as markdown } from './markdown.js';
import { register as not } from './not.js';
import { register as parse } from './parse.js';
import { register as parseURL } from './parseURL.js';
import { register as replace } from './replace.js';
import { register as or } from './or.js';
import { register as sliceArray } from './sliceArray.js';
import { register as sortArray } from './sortArray.js';
import { register as split } from './split.js';
import { register as truncate } from './truncate.js';
import { register as toJson } from './toJson.js';
import { register as urlParams } from './urlParams.js';

/* eslint-disable max-statements */
/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export default function register(handlebars) {
  array(handlebars);
  basename(handlebars);
  calc(handlebars);
  choice(handlebars);
  encodeUrl(handlebars);
  filterArray(handlebars);
  fromJson(handlebars);
  highlight(handlebars);
  htmlAttrs(handlebars);
  length(handlebars);
  map(handlebars);
  markdown(handlebars);
  not(handlebars);
  replace(handlebars);
  parse(handlebars);
  parseURL(handlebars);
  or(handlebars);
  sliceArray(handlebars);
  sortArray(handlebars);
  split(handlebars);
  truncate(handlebars);
  toJson(handlebars);
  urlParams(handlebars);

  // DEPRECATED
  add(handlebars);
  ifAnchorUrl(handlebars);
  convertBreaks(handlebars);
  ifContain(handlebars);
  ifLte(handlebars);
  ifModulo(handlebars);
  ifMatch(handlebars);
  is(handlebars);
  isnt(handlebars);
}
/* eslint-enable max-statements */

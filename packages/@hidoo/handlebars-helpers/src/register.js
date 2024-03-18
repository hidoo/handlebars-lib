import { register as add } from './add';
import { register as basename } from './basename';
import { register as choice } from './choice';
import { register as convertBreaks } from './convertBreaks';
import { register as encodeUrl } from './encodeUrl';
import { register as filterArray } from './filterArray';
import { register as fromJson } from './fromJson';
import { register as highlight } from './highlight';
import { register as ifAnchorUrl } from './ifAnchorUrl';
import { register as ifContain } from './ifContain';
import { register as ifLte } from './ifLte';
import { register as ifMatch } from './ifMatch';
import { register as ifModulo } from './ifModulo';
import { register as is } from './is';
import { register as isnt } from './isnt';
import { register as length } from './length';
import { register as markdown } from './markdown';
import { register as replace } from './replace';
import { register as or } from './or';
import { register as sliceArray } from './sliceArray';
import { register as sortArray } from './sortArray';
import { register as split } from './split';
import { register as toJson } from './toJson';

/* eslint-disable max-statements */
/**
 * register
 *
 * @param {Handlebars} handlebars Handlebars instance
 * @return {void}
 */
export default function register(handlebars) {
  add(handlebars);
  basename(handlebars);
  choice(handlebars);
  convertBreaks(handlebars);
  encodeUrl(handlebars);
  filterArray(handlebars);
  fromJson(handlebars);
  highlight(handlebars);
  ifAnchorUrl(handlebars);
  ifContain(handlebars);
  ifLte(handlebars);
  ifModulo(handlebars);
  ifMatch(handlebars);
  is(handlebars);
  isnt(handlebars);
  length(handlebars);
  markdown(handlebars);
  replace(handlebars);
  or(handlebars);
  sliceArray(handlebars);
  sortArray(handlebars);
  split(handlebars);
  toJson(handlebars);
}
/* eslint-enable max-statements */

import assert from 'node:assert';
import Handlebars from 'handlebars';
import highlight, { register } from '../src/highlight.js';

describe("{{highlight value lang='<lang>'}}", () => {
  let template = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('highlight', highlight);
    template = hbs.compile('{{{highlight value lang=options.lang}}}');
  });

  it('should return string if argument "value" is not string.', () => {
    const values = [
      [0, null, '0'],
      [null, null, ''],
      [{}, null, '[object Object]'],
      [[], null, '']
    ];

    values.forEach(([value, lang, expected]) => {
      const result = template({ value, options: { lang } });

      assert(typeof result === 'string');
      assert(result === expected);
    });
  });

  it('should return highlighted string if argument "value" is string.', () => {
    const values = [
      ['value', null, 'value'],
      [
        '<div class="hoge"></div>',
        'html',
        '<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;hoge&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>'
      ],
      [
        'import lodash from "lodash";',
        'js',
        '<span class="hljs-keyword">import</span> lodash <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;lodash&quot;</span>;'
      ],
      [
        '<div>{{#if @first}}first{{else}}not first{{/if}}</div>',
        'hbs',
        '<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-tag">{{#<span class="hljs-name"><span class="hljs-built_in">if</span></span> @first}}</span><span class="language-xml">first</span><span class="hljs-template-tag">{{<span class="hljs-keyword">else</span>}}</span><span class="language-xml">not first</span><span class="hljs-template-tag">{{/<span class="hljs-name"><span class="hljs-built_in">if</span></span>}}</span><span class="language-xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>'
      ]
    ];

    values.forEach(([value, lang, expected]) => {
      const result = template({ value, options: { lang } });

      assert(typeof result === 'string');
      assert(result === expected);
    });
  });

  describe('register', () => {
    it('should be registered.', () => {
      const hbs = Handlebars.create();

      register(hbs);
      hbs.registerHelper('viaRegisterHelper', highlight);

      assert(hbs.helpers.highlight === hbs.helpers.viaRegisterHelper);
    });
  });
});

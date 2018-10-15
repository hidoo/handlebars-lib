/* eslint no-magic-numbers: 0, max-len: 0 */

/**
 * import modules
 */
import assert from 'assert';
import Handlebars from 'handlebars';
import markdown from '../src/markdown';

describe('{{#markdown}}...{{/markdown}}', () => {
  let template = null,
      templateRawContent = null;

  before(() => {
    const hbs = Handlebars.create();

    hbs.registerHelper('markdown', markdown);
    template = hbs.compile('{{#markdown}}{{content}}{{/markdown}}');
    templateRawContent = hbs.compile('{{#markdown}}{{{content}}}{{/markdown}}');
  });

  it('should return empty string if "content" is empty value.', () => {
    const contents = [
      ['', ''],
      [[], ''],
      [null, '']
    ];

    contents.forEach(([content, expected]) => {
      const result = template({content});

      assert(typeof result === 'string');
      assert(result === expected);
    });
  });

  it('should return HTML string if "content" is markdown string.', () => {
    const contents = [
      [
        `# heading
+ list 1
+ list 2
+ list 3 [link](https://google.com)
`,
        `<h1 id="heading">heading</h1>
<ul>
<li>list 1</li>
<li>list 2</li>
<li>list 3 <a href="https://google.com">link</a></li>
</ul>
`
      ]
    ];

    contents.forEach(([content, expected]) => {
      const result = template({content});

      assert(typeof result === 'string');
      assert(result === expected);
    });
  });

  it('should return highlighted HTML string if "content" is markdown string that include code block.', () => {
    const contents = [
      [
        `# heading
\`\`\`html
<div class="hoge">
  huga
</div>
\`\`\`
`,
        `<h1 id="heading">heading</h1>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hoge"</span>&gt;</span>
  huga
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
`
      ]
    ];

    contents.forEach(([content, expected]) => {
      const result = templateRawContent({content});

      assert(typeof result === 'string');
      assert(result === expected);
    });
  });
});

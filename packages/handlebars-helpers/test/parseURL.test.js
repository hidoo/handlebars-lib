import assert from 'node:assert';
import Handlebars from 'handlebars';
import parseURL, { register } from '../src/parseURL.js';
import toJson from '../src/toJson.js';

const DEBUG = Boolean(process.env.DEBUG);

describe('{{parseURL <url> [base=baseURL]}}', () => {
  let hbs = null;
  let template = null;

  beforeEach(() => {
    hbs = Handlebars.create();

    hbs.logger.level = DEBUG ? 'info' : 'warn';
    hbs.registerHelper('parseURL', parseURL);
    hbs.registerHelper('toJson', toJson);
    template = hbs.compile('{{{toJson (parseURL url base=options.base)}}}');
  });

  context('if no arguments.', () => {
    it('should return an empty object.', () => {
      assert.deepEqual(parseURL(), {});
      assert.equal(template({}), '{}');
    });
  });

  context('if <url> is specified.', () => {
    it('should return parsed URL as an object.', () => {
      const cases = [
        [
          ['https://example.com:8080/path/to/basename.ext?foo=Foo&bar#baz'],
          {
            hash: '#baz',
            host: 'example.com:8080',
            hostname: 'example.com',
            href: 'https://example.com:8080/path/to/basename.ext?foo=Foo&bar#baz',
            origin: 'https://example.com:8080',
            password: '',
            pathname: '/path/to/basename.ext',
            port: '8080',
            protocol: 'https:',
            search: '?foo=Foo&bar',
            searchParams: {
              foo: 'Foo',
              bar: ''
            },
            username: ''
          }
        ],
        [
          [
            '/path/to/basename.ext?foo=Foo&bar#baz',
            'https://hoge.example.com/'
          ],
          {
            hash: '#baz',
            host: 'hoge.example.com',
            hostname: 'hoge.example.com',
            href: 'https://hoge.example.com/path/to/basename.ext?foo=Foo&bar#baz',
            origin: 'https://hoge.example.com',
            password: '',
            pathname: '/path/to/basename.ext',
            port: '',
            protocol: 'https:',
            search: '?foo=Foo&bar',
            searchParams: {
              foo: 'Foo',
              bar: ''
            },
            username: ''
          }
        ]
      ];

      cases.forEach(([[url, base], expected]) => {
        {
          const actual = parseURL(url, { hash: { base } });

          if (DEBUG) {
            console.log(
              '[DEBUG] parseURL: %O => %O = %O',
              url,
              actual,
              expected
            );
          }

          assert.equal(typeof actual, 'object');
          assert.deepEqual(actual, expected);
        }
        {
          const actual = template({ url, options: { base } });

          if (DEBUG) {
            console.log(
              '[DEBUG] {{parseURL}}: %O => %O = %O',
              url,
              actual,
              expected
            );
          }

          assert(typeof actual === 'string');
          assert.equal(actual, JSON.stringify(expected));
        }
      });
    });
  });

  context('use with {{if}} and {{lookup}} helpers.', () => {
    it('should be able to use instead of {{ifAnchorUrl}}.', () => {
      const cases = [
        ['https://example.com/', ''],
        ['https://example.com/path/to/', ''],
        ['https://example.com/path/to/?hoo=Foo', ''],
        ['https://example.com/#hash', 'is anchor url'],
        ['https://example.com/path/to/#hash', 'is anchor url'],
        ['https://example.com/path/to/?hoo=Foo#hash', 'is anchor url']
      ];
      template = hbs.compile(
        `{{#if (lookup (parseURL url) 'hash')}}is anchor url{{/if}}`
      );

      cases.forEach(([url, expected]) => {
        const actual = template({ url });

        assert.equal(actual, expected);
      });
    });
  });

  describe('register', () => {
    it('should register with specified Handlebars instance.', () => {
      register(hbs);
      hbs.registerHelper('viaRegisterHelper', parseURL);
      hbs.registerHelper('toJson', toJson);

      const url = 'https://example.com/path/to/basename.ext?foo=Foo&bar#baz';

      assert.equal(
        hbs.compile('{{toJson (parseURL url)}}')({ url }),
        hbs.compile('{{toJson (viaRegisterHelper url)}}')({ url })
      );
    });
  });
});

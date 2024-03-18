import assert from 'node:assert';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import expressEngineHandlebars from '../src/index.js';

describe('express-engine-handlebars', () => {
  let dirname = null;
  let fixtureDir = null;
  let srcDir = null;
  let expectedDir = null;
  let app = null;
  let server = null;

  before(() => {
    dirname = path.dirname(fileURLToPath(import.meta.url));
    fixtureDir = path.resolve(dirname, 'fixtures');
    srcDir = path.resolve(fixtureDir, 'src');
    expectedDir = path.resolve(fixtureDir, 'expected');
  });

  beforeEach(() => {
    app = express();
    app.set('view engine', 'hbs');
    app.set('views', path.resolve(srcDir, 'views'));
  });

  afterEach(() => {
    server.close();
    server.closeAllConnections();
    server = null;
    app = null;
  });

  it('should out internal server error if syntax error.', async () => {
    app.engine('hbs', expressEngineHandlebars());
    app.get('/syntax-error', (req, res) => {
      res.render('syntax-error', {
        title: 'syntax error test',
        contents: 'syntax error contents'
      });
    });
    await new Promise((resolve) => {
      server = app.listen(3000, resolve);
    });

    const response = await fetch('http://localhost:3000/syntax-error');

    assert.equal(response.status, 500);
  });

  it('should out it as is if layout not use.', async () => {
    app.engine('hbs', expressEngineHandlebars());
    app.get('/no-layout', (req, res) => {
      res.render('no-layout', {
        title: 'no layout test',
        contents: 'no layout contents'
      });
    });
    await new Promise((resolve) => {
      server = app.listen(3000, resolve);
    });

    const response = await fetch('http://localhost:3000/no-layout');
    const expected = await fs.readFile(
      path.resolve(expectedDir, 'no-layout.html')
    );

    assert.equal(response.status, 200);
    assert.equal(await response.text(), expected.toString());
  });

  it('should out applied specified layout if layout use.', async () => {
    app.engine(
      'hbs',
      expressEngineHandlebars({
        layouts: path.resolve(srcDir, 'views/layouts/**/*.hbs')
      })
    );
    app.get('/with-layout', (req, res) => {
      res.render('with-layout', {
        title: 'with layout test',
        contents: 'with layout contents'
      });
    });
    await new Promise((resolve) => {
      server = app.listen(3000, resolve);
    });

    const response = await fetch('http://localhost:3000/with-layout');
    const expected = await fs.readFile(
      path.resolve(expectedDir, 'with-layout.html')
    );

    assert.equal(response.status, 200);
    assert.equal(await response.text(), expected.toString());
  });

  it('should out applied specified partial if partial use.', async () => {
    app.engine(
      'hbs',
      expressEngineHandlebars({
        partials: path.resolve(srcDir, 'views/partials/**/*.hbs')
      })
    );
    app.get('/with-partial', (req, res) => {
      res.render('with-partial', {
        title: 'with partial test',
        contents: 'with partial contents'
      });
    });
    await new Promise((resolve) => {
      server = app.listen(3000, resolve);
    });

    const response = await fetch('http://localhost:3000/with-partial');
    const expected = await fs.readFile(
      path.resolve(expectedDir, 'with-partial.html')
    );

    assert.equal(response.status, 200);
    assert.equal(await response.text(), expected.toString());
  });

  it('should out applied specified helpers if it default helpers use.', async () => {
    app.engine('hbs', expressEngineHandlebars());
    app.get('/with-default-helpers', (req, res) => {
      res.render('with-default-helpers', {
        title: 'with default helpers test',
        contents: `
# heading

> with default helpers test.

+ list 1
+ list 2
+ list 3

\`\`\`js
import hoge from 'hoge';

hoge();
\`\`\`
        `
      });
    });
    await new Promise((resolve) => {
      server = app.listen(3000, resolve);
    });

    const response = await fetch('http://localhost:3000/with-default-helpers');
    const expected = await fs.readFile(
      path.resolve(expectedDir, 'with-default-helpers.html')
    );

    assert.equal(response.status, 200);
    assert.equal(await response.text(), expected.toString());
  });

  it('should out applied specified helpers if additional helpers use.', async () => {
    app.engine(
      'hbs',
      expressEngineHandlebars({
        helpers: path.resolve(srcDir, 'views/helpers/**/*.js')
      })
    );
    app.get('/with-additional-helpers', (req, res) => {
      res.render('with-additional-helpers', {
        title: 'with additional helpers test',
        contents: 'with additional helpers contents'
      });
    });
    await new Promise((resolve) => {
      server = app.listen(3000, resolve);
    });

    const response = await fetch(
      'http://localhost:3000/with-additional-helpers'
    );
    const expected = await fs.readFile(
      path.resolve(expectedDir, 'with-additional-helpers.html')
    );

    assert.equal(response.status, 200);
    assert.equal(await response.text(), expected.toString());
  });
});

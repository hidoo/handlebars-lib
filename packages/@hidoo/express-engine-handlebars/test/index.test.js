import assert from 'assert';
import fs from 'fs';
import path from 'path';
import request from 'request';
import express from 'express';
import expressEngineHandlebars from '../src';

describe('express-engine-handlebars', () => {
  let fixtureDir = null;
  let srcDir = null;
  let expectedDir = null;
  let app = null;
  let server = null;

  before(() => {
    fixtureDir = path.resolve(__dirname, 'fixtures');
    srcDir = path.resolve(fixtureDir, 'src');
    expectedDir = path.resolve(fixtureDir, 'expected');
  });

  beforeEach(() => {
    app = express();
    app.set('view engine', 'hbs');
    app.set('views', path.resolve(srcDir, 'views'));
  });

  afterEach(() => {
    app = null;
    server.close();
  });

  it('should out internal server error if syntax error.', (done) => {
    app.engine('hbs', expressEngineHandlebars());
    app.get('/syntax-error', (req, res) => {
      res.render('syntax-error', {
        title: 'syntax error test',
        contents: 'syntax error contents'
      });
    });

    server = app.listen(3000, () => {
      request('http://localhost:3000/syntax-error', (error, response) => {
        if (error) {
          return done(error);
        }
        const { statusCode } = response;

        assert.equal(statusCode, 500);
        return done();
      });
    });
  });

  it('should out it as is if layout not use.', (done) => {
    app.engine('hbs', expressEngineHandlebars());
    app.get('/no-layout', (req, res) => {
      res.render('no-layout', {
        title: 'no layout test',
        contents: 'no layout contents'
      });
    });

    server = app.listen(3000, () => {
      request('http://localhost:3000/no-layout', (error, response, body) => {
        if (error) {
          return done(error);
        }
        const expected = fs.readFileSync(
          path.resolve(expectedDir, 'no-layout.html')
        );

        assert.equal(body.toString(), expected.toString());
        return done();
      });
    });
  });

  it('should out applied specified layout if layout use.', (done) => {
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

    server = app.listen(3000, () => {
      request('http://localhost:3000/with-layout', (error, response, body) => {
        if (error) {
          return done(error);
        }
        const expected = fs.readFileSync(
          path.resolve(expectedDir, 'with-layout.html')
        );

        assert.equal(body.toString(), expected.toString());
        return done();
      });
    });
  });

  it('should out applied specified partial if partial use.', (done) => {
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

    server = app.listen(3000, () => {
      request('http://localhost:3000/with-partial', (error, response, body) => {
        if (error) {
          return done(error);
        }
        const expected = fs.readFileSync(
          path.resolve(expectedDir, 'with-partial.html')
        );

        assert.equal(body.toString(), expected.toString());
        return done();
      });
    });
  });

  it('should out applied specified helpers if it default helpers use.', (done) => {
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

    server = app.listen(3000, () => {
      request(
        'http://localhost:3000/with-default-helpers',
        (error, response, body) => {
          if (error) {
            return done(error);
          }
          const expected = fs.readFileSync(
            path.resolve(expectedDir, 'with-default-helpers.html')
          );

          assert.equal(body.toString(), expected.toString());
          return done();
        }
      );
    });
  });

  it('should out applied specified helpers if additinal helpers use.', (done) => {
    app.engine(
      'hbs',
      expressEngineHandlebars({
        helpers: path.resolve(srcDir, 'views/helpers/**/*.js')
      })
    );
    app.get('/with-additinal-helpers', (req, res) => {
      res.render('with-additinal-helpers', {
        title: 'with additinal helpers test',
        contents: 'with additinal helpers contents'
      });
    });

    server = app.listen(3000, () => {
      request(
        'http://localhost:3000/with-additinal-helpers',
        (error, response, body) => {
          if (error) {
            return done(error);
          }
          const expected = fs.readFileSync(
            path.resolve(expectedDir, 'with-additinal-helpers.html')
          );

          assert.equal(body.toString(), expected.toString());
          return done();
        }
      );
    });
  });
});

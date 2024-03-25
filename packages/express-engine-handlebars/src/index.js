/* eslint import/no-unresolved: warn */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Handlebars from 'handlebars';
import layoutsHelper from 'handlebars-layouts';
import defaultHelperRegister from '@hidoo/handlebars-helpers/register';
import { globPromise, readFile, readFiles } from './util.js';

/**
 * Handlebars default instance
 *
 * @type {Object}
 */
export { default as Handlebars } from 'handlebars';

/**
 * default options
 *
 * @type {Object}
 */
const DEFAULT_OPTIONS = {
  // Handlebars partials files glob pattern
  partials: '',

  // Handlebars layouts files glob pattern
  layouts: '',

  // Handlebars helpers object
  helpers: {},

  // handlebars instance
  handlebars: null,

  // handlebars compile method options
  // + see: https://handlebarsjs.com/reference.html#base-compile
  compileOptions: {},

  // out log or not
  verbose: false
};

/**
 * return Handlebars template engine for express
 *
 * @example
 * import express from 'express';
 * import expressEngineHandlebars from '@hidoo/express-engine-handlebars';
 *
 * const app = express();
 *
 * app.set('view engine', 'hbs');
 * app.set('views', '/path/to/views');
 * app.engine('hbs', expressEngineHandlebars({
 *   layouts: '/path/to/views/layouts/**.hbs',
 *   partials: '/path/to/views/partials/**.hbs',
 *   helpers: '/path/to/views/helpers/**.js'
 * }));
 *
 * @param {Object} [options={}] options
 * @return {Function}
 */
export default function expressEngineHandlebars(options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  /* eslint-disable max-statements */
  return async (filepath, context, done) => {
    const { verbose } = opts;
    const dirname = path.dirname(fileURLToPath(import.meta.url));

    try {
      const { error, contents } = await readFile(filepath, { verbose });
      const layouts = await readFiles(opts.layouts, { verbose });
      const partials = await readFiles(opts.partials, { verbose });
      const hbs = opts.handlebars || Handlebars.create();

      // filepath not loaded
      if (error) {
        throw error;
      }

      // register layouts helper
      hbs.registerHelper(layoutsHelper(hbs));

      // register default helpers
      defaultHelperRegister(hbs);

      // register additional helpers
      if (typeof opts.helpers === 'string') {
        const modulePaths = await globPromise(opts.helpers, {
          silent: verbose
        });

        await Promise.all(
          modulePaths
            .map((modulePath) => path.relative(dirname, modulePath))
            .filter((modulePath) =>
              ['.js', '.cjs', '.mjs'].includes(path.extname(modulePath))
            )
            .map(async (modulePath) => {
              const { register } = await import(modulePath);

              if (typeof register !== 'function') {
                if (verbose) {
                  process.emitWarning('Invalid helper format', {
                    code: 'E_INVALID_HELPER',
                    detail: `Helper '${modulePath}' is not valid format.`
                  });
                }
                return null;
              }
              return register(hbs);
            })
        );
      }

      // register layouts and partials
      [...layouts, ...partials].forEach((file) => {
        const name = file.relative
          .replace(file.extname, '')
          .split(path.sep)
          .join('/');

        hbs.registerPartial(name, file.contents.toString());
      });

      const template = hbs.compile(contents.toString(), opts.compileOptions);

      done(null, template(context));
    } catch (error) {
      done(error);
    }
  };
  /* eslint-enable max-statements */
}

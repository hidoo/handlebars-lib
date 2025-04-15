import fs from 'node:fs/promises';
import { glob } from 'glob';
import globParent from 'glob-parent';
import Vinyl from 'vinyl';

/**
 * promisify glob
 *
 * @param {String} pattern glob pattern
 * @param {Object} options same as options of glob
 * @return {Array<String>}
 */
export async function globPromise(pattern = '', options = {}) {
  try {
    const filePaths = await glob(pattern, options);

    return filePaths;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return [];
  }
}

/**
 * read file async
 *
 * @param {String} filePath file path
 * @param {Object} options options
 * @param {Object} options.encoding same as options.encoding of fs.readFile
 * @param {Object} options.flag flag as options.flag of fs.readFile
 * @param {Object} options.base base path
 * @param {Object} options.verbose out log or not
 * @return {Promise<Vinyl>}
 */
export async function readFile(filePath, options = {}) {
  const { base, verbose, ...readFileOptions } = options;

  try {
    const contents = await fs.readFile(filePath, readFileOptions);

    return new Vinyl({ path: filePath, base, contents });
  } catch (error) {
    if (verbose) {
      console.error(error);
    }
    return new Vinyl({ path: filePath, base, error });
  }
}

/**
 * read multi file async
 *
 * @param {String} pattern glob pattern
 * @param {Object} options options
 * @param {Object} options.glob same as options of glob
 * @param {Object} options.readFile same as options of fs.readFile
 * @param {Object} options.verbose out log or not
 * @return {Promise<Array<Vinyl>>}
 */
export async function readFiles(pattern, options = {}) {
  const { verbose } = options;
  const base = globParent(pattern);

  const filePaths = await globPromise(pattern, {
    silent: !verbose,
    ...options.glob
  });

  const files = await Promise.all(
    filePaths.map((filepath) =>
      readFile(filepath, { ...options.readFile, base, verbose })
    )
  );

  return files.filter(({ error }) => !error);
}

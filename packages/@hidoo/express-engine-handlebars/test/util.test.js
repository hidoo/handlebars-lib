import assert from 'node:assert';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Vinyl from 'vinyl';
import { globPromise, readFile, readFiles } from '../src/util.js';

describe('util', () => {
  let dirname = null;
  let fixtureDir = null;
  let srcDir = null;
  let notAccessibleDir = null;

  before(async () => {
    dirname = path.dirname(fileURLToPath(import.meta.url));
    fixtureDir = path.resolve(dirname, 'fixtures');
    srcDir = path.resolve(fixtureDir, 'src');
    notAccessibleDir = path.resolve(fixtureDir, '__NOT_ACCESSIBLE__');

    await fs.mkdir(notAccessibleDir);
    await fs.mkdir(path.resolve(notAccessibleDir, 'target'), 0);
  });

  after(async () => {
    await fs.rm(notAccessibleDir, { recursive: true });
  });

  describe('globPromise', () => {
    it('should return Promise<Array> that includes empty array if argument "pattern" is not accessible.', async () => {
      const filepaths = await globPromise(
        `${notAccessibleDir}/target/**/*.txt`,
        { silent: true }
      );

      assert(Array.isArray(filepaths));
      assert(filepaths.length === 0);
    });

    it('should return Promise<Array> that includes empty array if argument "pattern" matched files not readed.', async () => {
      const filepaths = await globPromise(`${srcDir}/not_exists_*.txt`, {
        silent: true
      });

      assert(Array.isArray(filepaths));
      assert(filepaths.length === 0);
    });

    it('should return Promise<Array> that includes file paths if argument "pattern" matched files readed.', async () => {
      const filepaths = await globPromise(`${srcDir}/exists_*.txt`, {
        silent: true
      });

      assert(Array.isArray(filepaths));
      assert(filepaths.length > 0);
      filepaths.forEach((filepath) => assert(typeof filepath === 'string'));
    });
  });

  describe('readFile', () => {
    it('should return Promise<Vinyl> that includes "error" if argument "filepath" could not readed.', async () => {
      const file = await readFile(path.resolve(srcDir, 'not_exists_file.txt'));

      assert(Vinyl.isVinyl(file));
      assert(file.error instanceof Error);
      assert(file.contents === null);
    });

    it('should return Promise<Vinyl> that includes "contents" if argument "filepath" readed.', async () => {
      const file = await readFile(path.resolve(srcDir, 'exists_file.txt'));

      assert(Vinyl.isVinyl(file));
      assert(typeof file.error === 'undefined');
      assert(file.contents);
    });
  });

  describe('readFiles', () => {
    it('should return Promise<Array> that includes empty array if argument "pattern" is not accessible.', async () => {
      const files = await readFiles(
        path.resolve(notAccessibleDir, 'target/**/*.txt')
      );

      assert(Array.isArray(files));
      assert(files.length === 0);
    });

    it('should return Promise<Array> that includes empty array if argument "pattern" matched files not readed.', async () => {
      const files = await readFiles(path.resolve(srcDir, 'not_exists_*.txt'));

      assert(Array.isArray(files));
      assert(files.length === 0);
    });

    it('should return Promise<Array<Vinyl>> that includes array of Vinyl if argument "pattern" matched files readed.', async () => {
      const files = await readFiles(path.resolve(srcDir, 'exists_*.txt'));

      assert(Array.isArray(files));
      assert(files.length > 0);
      files.forEach((file) => {
        assert(Vinyl.isVinyl(file));
        assert(typeof file.error === 'undefined');
        assert(file.contents);
      });
    });
  });
});

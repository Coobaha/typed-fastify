import chokidar from 'chokidar';
import gen from './gen';
import path from 'node:path';
import fsp from 'node:fs/promises';

export function watcher(files: string | string[]) {
  const watcher = chokidar.watch(files);
  watcher.on('change', async (file: string) => {
    await gen({ files: [file] });
  });
  watcher.on('add', async (file: string) => {
    await gen({ files: [file] });
  });
  watcher.on('unlink', async (file: string) => {
    const jsonFile = path.parse(file);
    const schema = path.format({
      ...jsonFile,
      base: path.basename(jsonFile.base, jsonFile.ext) + '.gen.json',
      ext: '.json',
    });
    const exists = await fsp
      .stat(schema)
      .then(() => true)
      .catch(() => false);

    if (exists) {
      await fsp.rm(schema);
    }
  });
}

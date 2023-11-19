#!/usr/bin/env node
import yargs from 'yargs';

import { hideBin } from 'yargs/helpers';
import gen from './gen';
import { glob } from 'glob';
import { watcher } from './watcher';

yargs(hideBin(process.argv))
  .command(
    'gen [files]',
    'Generates json schemas next to corresponding ts files',
    (yargs) =>
      yargs
        .positional('files', {
          describe: 'glob pattern of files',
          type: 'string',
          demandOption: true,
        })
        .option('watch', {
          alias: 'w',
          type: 'boolean',
          description: 'Watch files for changes',
        })
        .demandOption(['files']),
    async (argv) => {
      if (argv.watch) {
        console.log('Watching for changes...');
        watcher(argv.files);
        return;
      }

      console.log('Generating schemas...');
      const files = await glob(argv.files);
      await gen({ files });
    },
  )
  .demandCommand(1, 'You need at least one command before moving on')
  .strict().argv;

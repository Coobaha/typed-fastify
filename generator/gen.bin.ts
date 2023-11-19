#!/usr/bin/env node
import yargs from 'yargs';

import { hideBin } from 'yargs/helpers';
import gen from './gen';
import { glob } from 'glob';
import { watcher } from './watcher';

yargs(hideBin(process.argv))
  .command(
    'gen [files...]',
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
        .demandOption(['files'])
        .example(`$0 gen -w 'src/example_schema.ts'`, `Generate schemas for example_schema.ts`)
        .example(`$0 gen 'src/**/*.ts'`, `Generate schemas for all ts files in src`)
        .example(`$0 gen -w 'src/**/*.ts'`, `Watch for changes in src`),
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
  .example(`$0 gen 'src/**/*.ts'`, `Generate schemas for all ts files in src`)
  .demandCommand(1, 'You need at least one command before moving on')
  .strict().argv;

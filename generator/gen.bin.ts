#!/usr/bin/env node
import yargs from 'yargs';

// @ts-ignore
import { hideBin } from 'yargs/helpers';
import gen from './gen';
import glob from 'glob';
import { promisify } from 'util';
const resolveGlobFiles = promisify(glob);

yargs(hideBin(process.argv))
  .command<{ files: string }>(
    'gen [files]',
    'Generates json schemas next to corresponding ts files',
    (yargs) => {
      yargs
        .positional('files', {
          describe: 'glob pattern of files',
          type: 'string',
          demandOption: true,
        })
        .demandOption(['files']);
    },
    async (argv) => {
      const files = await resolveGlobFiles(argv.files);

      await gen({ files });
    },
  )
  .demandCommand(1, 'You need at least one command before moving on')
  .strict().argv;

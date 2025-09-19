'use strict';
import { existsSync, rmSync } from 'fs';
import { resolve } from 'path';
import { DefaultLogger, MaiLogLevels, NodeLogger } from '../src';

const isLocal = process.env.IS_LOCAL === 'true';

const log = isLocal?
  new NodeLogger({ level: MaiLogLevels.trace }):
  new DefaultLogger({ level: MaiLogLevels.debug });

const rootdir = resolve(__dirname, '..');
const distIndexHTML = resolve(rootdir, 'index.html');
const distdir = resolve(rootdir, 'dist');

if (existsSync(distIndexHTML)) {
  rmSync(distIndexHTML);
  log.info(`Removed: ${distIndexHTML}`);
}

if (existsSync(distdir)) {
  rmSync(distdir, { recursive: true });
  log.info(`Removed: ${distdir}`);
}

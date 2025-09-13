'use strict';
import { existsSync, rmdirSync, rmSync } from 'fs';
import { resolve } from 'path';
import { DefaultLogger, MaiLogLevels } from '../src';

const log = new DefaultLogger({ level: MaiLogLevels.debug });

const rootdir = resolve(__dirname, '..');
const distIndexHTML = resolve(rootdir, 'index.html');
const distdir = resolve(rootdir, 'dist');

if (existsSync(distIndexHTML)) {
  rmSync(distIndexHTML);
  log.info(`Removed: ${distIndexHTML}`);
}

if (existsSync(distdir)) {
  rmdirSync(distdir, { recursive: true });
  log.info(`Removed: ${distdir}`);
}

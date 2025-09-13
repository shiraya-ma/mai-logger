'use strict';
import { copyFileSync, existsSync, rmSync } from 'fs';
import { resolve } from 'path';
import { DefaultLogger, MaiLogLevels } from '../src';

const dLog = new DefaultLogger({ level: MaiLogLevels.trace });

const rootdir = resolve(__dirname, '..');
const srcIndexHTML = resolve(rootdir, '.bun', 'index.html');
const distIndexHTML = resolve(rootdir, 'index.html');

if (existsSync(distIndexHTML)) {
  rmSync(distIndexHTML);
  dLog.info(`Removed: ${distIndexHTML}`);
}

copyFileSync(srcIndexHTML, distIndexHTML);
dLog.info(`Copied: ${srcIndexHTML} -> ${distIndexHTML}`);

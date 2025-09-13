'use strict';
import { copyFileSync, existsSync, rmSync } from 'fs';
import { resolve } from 'path';
import { DefaultLogger, MaiLogLevels, NodeLogger } from '../src';

const dLog = new DefaultLogger({ level: MaiLogLevels.trace });
const nLog = new NodeLogger({ level: MaiLogLevels.trace });

const rootdir = resolve(__dirname, '..');
const srcIndexHTML = resolve(rootdir, '.bun', 'index.html');
const distIndexHTML = resolve(rootdir, 'index.html');

if (existsSync(distIndexHTML)) {
  rmSync(distIndexHTML);
  nLog.info(`Removed: ${distIndexHTML}`);
}

copyFileSync(srcIndexHTML, distIndexHTML);
nLog.info(`Copied: ${srcIndexHTML} -> ${distIndexHTML}`);

dLog.trace('this is default trace log');
dLog.debug('this is default debug log');
dLog.info('this is default info log');
dLog.warn('this is default warn log');
dLog.error('this is default error log');

nLog.trace('this is node trace log');
nLog.debug('this is node debug log');
nLog.info('this is node info log');
nLog.warn('this is node warn log');
nLog.error('this is node error log');

nLog.info('Preload script is done. You can start development server with `vite dev`.');

'use strict';
import { MaiLogger } from '.';
// import { MaiLogger } from '../dist'

const level: number | MaiLogger.LogLevel = 'TRACE';

const log = new MaiLogger({ level });

console.log('logLevel:', level);

log.trace('trace log');

log.debug('debug log');

log.info('%c[hoge]', '#f00', '%cinfo log', 'inherit');

log.warn('warn log');

log.error('error log');

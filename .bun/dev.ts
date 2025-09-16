'use strict';
import { DefaultLogger, BrowserLogger, MaiLogLevels } from '../src';

const log = new BrowserLogger({ level: MaiLogLevels.trace });

log.info('Development server is running...');

log.error('this is error log');
log.warn('this is warn log');
log.info('this is info log');
log.debug('this is debug log');
log.trace('this is trace log');

declare global {
  interface Window {
    DefaultLogger: typeof DefaultLogger;
    BrowserLogger: typeof BrowserLogger;
    MaiLogLevels: typeof MaiLogLevels;
  }
};

window.DefaultLogger = DefaultLogger;
window.BrowserLogger = BrowserLogger;
window.MaiLogLevels = MaiLogLevels;

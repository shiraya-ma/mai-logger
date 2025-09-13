'use strict';
import { DefaultLogger, MaiLogLevels } from '../src';

const dLog = new DefaultLogger({ level: MaiLogLevels.debug });

dLog.info('Development server is running...');

declare global {
  interface Window {
    DefaultLogger: typeof DefaultLogger;
    MaiLogLevels: typeof MaiLogLevels;
  }
};

window.DefaultLogger = DefaultLogger;
window.MaiLogLevels = MaiLogLevels;

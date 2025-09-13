'use strict';
import { DefaultLogger, MaiLogLevels } from '../src';

const dLog = new DefaultLogger({ level: MaiLogLevels.debug });

dLog.info('Development server is running...');

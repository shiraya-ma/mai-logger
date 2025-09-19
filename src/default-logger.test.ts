'use strict';
import { describe, it, expect, beforeEach, jest, afterAll } from 'bun:test';

import { DefaultLogger } from './default-logger';
import { MaiLogLevels } from './types';

describe('DefaultLogger', () => {
  const original = {
    error: console.error,
    warn : console.warn,
    info : console.info,
    debug: console.debug,
  };

  const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  const mockConsoleWarn  = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const mockConsoleInfo  = jest.spyOn(console, 'info').mockImplementation(() => {});
  const mockConsoleDebug = jest.spyOn(console, 'debug').mockImplementation(() => {});

  beforeEach(() => {
    mockConsoleError.mockClear();
    mockConsoleWarn.mockClear();
    mockConsoleInfo.mockClear();
    mockConsoleDebug.mockClear();
  });

  afterAll(() => {
    jest.spyOn(console, 'error').mockImplementation(original.error);
    jest.spyOn(console, 'warn').mockImplementation(original.warn);
    jest.spyOn(console, 'info').mockImplementation(original.info);
    jest.spyOn(console, 'debug').mockImplementation(original.debug);
  });

  describe('constructor', () => {
    it('should configure correctly if level is valid', () => {
      const logger = new DefaultLogger({ level: MaiLogLevels.info });
      // _level is private, so if it cannot be tested directly, verify indirectly
      // Here, we instantiate with info level and test that error and info are logged
      logger.error('Test error');
      logger.info('Test info');
      logger.debug('Test debug');
      expect(mockConsoleError).toHaveBeenCalledTimes(1);
      expect(mockConsoleInfo).toHaveBeenCalledTimes(1);
      expect(mockConsoleDebug).not.toHaveBeenCalled();
    });

    it('should throw error if level is invalid', () => {
      expect(() => {
        new DefaultLogger({ level: 99 });
      }).toThrow('The input value is expected to be a number between 0 and 4. An invalid value outside the valid range was provided. (level: 99)');
    });
  });

  describe('log methods', () => {
    it('Only error should be logged at error level', () => {
      const logger = new DefaultLogger({ level: MaiLogLevels.error });
      logger.error('Error log');
      logger.warn('Warn log');
      logger.info('Info log');
      logger.debug('Debug log');
      expect(mockConsoleError).toHaveBeenCalledTimes(1);
      expect(mockConsoleWarn).not.toHaveBeenCalled();
      expect(mockConsoleInfo).not.toHaveBeenCalled();
      expect(mockConsoleDebug).not.toHaveBeenCalled();
    });

    it('Error and warn should be logged at warn level', () => {
      const logger = new DefaultLogger({ level: MaiLogLevels.warn });
      logger.error('Error log');
      logger.warn('Warn log');
      logger.info('Info log');
      logger.debug('Debug log');
      expect(mockConsoleError).toHaveBeenCalledTimes(1);
      expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
      expect(mockConsoleInfo).not.toHaveBeenCalled();
      expect(mockConsoleDebug).not.toHaveBeenCalled();
    });

    // Similarly, test other levels (info, debug, trace)
    it('Error, warn, and info should be logged at info level', () => {
        const logger = new DefaultLogger({ level: MaiLogLevels.info });
        logger.error('Error log');
        logger.warn('Warn log');
        logger.info('Info log');
        logger.debug('Debug log');
        expect(mockConsoleError).toHaveBeenCalledTimes(1);
        expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
        expect(mockConsoleInfo).toHaveBeenCalledTimes(1);
        expect(mockConsoleDebug).not.toHaveBeenCalled();
    });
    
    it('Error, warn, info, and debug should be logged at debug level', () => {
        const logger = new DefaultLogger({ level: MaiLogLevels.debug });
        logger.error('Error log');
        logger.warn('Warn log');
        logger.info('Info log');
        logger.debug('Debug log');
        expect(mockConsoleError).toHaveBeenCalledTimes(1);
        expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
        expect(mockConsoleInfo).toHaveBeenCalledTimes(1);
        expect(mockConsoleDebug).toHaveBeenCalledTimes(1);
    });

    it('All logs should be logged at trace level', () => {
        const logger = new DefaultLogger({ level: MaiLogLevels.trace });
        logger.error('Error log');
        logger.warn('Warn log');
        logger.info('Info log');
        logger.debug('Debug log');
        logger.trace('Trace log');
        expect(mockConsoleError).toHaveBeenCalledTimes(1);
        expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
        expect(mockConsoleInfo).toHaveBeenCalledTimes(1);
        expect(mockConsoleDebug).toHaveBeenCalledTimes(2); // trace also calls console.debug
    });
  });
});
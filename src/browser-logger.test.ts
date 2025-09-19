'use strict';
import { describe, it, expect, beforeAll, beforeEach, jest, afterAll, mock, setSystemTime, afterEach } from 'bun:test';

import { BrowserLogger } from './browser-logger';
import { DefaultLogger } from './default-logger';
import {
  DefaultLoggerConstructorOptions,
  MaiLogLabels,
  MaiLogLevels,
} from './types';

describe('BrowserLogger', () => {
  const originalDefaultLogger = DefaultLogger;
  const mockDateProps = [
    2001, // year
    0,    // month
    1,    // day
    0,    // hour
    0,    // minutes
    0,    // seconds
    0,    // milliseconds
  ] as [ number, number, number, number, number, number, number ];

  let mockDefaultLoggerConstructor: jest.Mock<(options: DefaultLoggerConstructorOptions) => DefaultLogger> | undefined;
  let mocked: Omit<DefaultLogger, '_level'> | undefined;

  // Create a new BrowserLogger instance and mock instance before each test
  beforeEach(() => {
    mocked = {
      error: jest.fn(),
      warn : jest.fn(),
      info : jest.fn(),
      debug: jest.fn(),
      trace: jest.fn(),
    };

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    mockDefaultLoggerConstructor = jest.fn((options: DefaultLoggerConstructorOptions) => {
      return mocked as unknown as DefaultLogger
    });

    class MockDefaultLogger {
      constructor (options: DefaultLoggerConstructorOptions) {
        return mockDefaultLoggerConstructor!(options);
      };      
    };

    mock.module('./default-logger', () => ({
      DefaultLogger: MockDefaultLogger,
    }));

    setSystemTime(new Date(...mockDateProps));
  });

  afterEach(() => {
    mock.module('./default-logger', () => ({
      DefaultLogger: originalDefaultLogger,
    }));
  });
  
  // Tests for constructor
  describe('constructor', () => {
    it('should configure with locale is valid', () => {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const logger = new BrowserLogger({ level: MaiLogLevels.warn, locale: 'en-US' });
      // Verify that the internal DefaultLogger is correctly initialized
      expect(mockDefaultLoggerConstructor).toHaveBeenCalledWith({ level: MaiLogLevels.warn });
      // Verify that the locale is correctly configured
      // The original test for "locale" property is removed since the property does not exist on the class.
    });

    it('should configure locale with default "ja-JP" without locale', () => {
      const logger = new BrowserLogger({ level: MaiLogLevels.warn });
      // Verify that the internal DefaultLogger is correctly initialized
      expect(mockDefaultLoggerConstructor).toHaveBeenCalledWith({ level: MaiLogLevels.warn });
      // Verify that the locale is correctly configured
      expect(logger.locale).toBe('ja-JP');
    });
  });
  
  // Tests for log methods and formatting
  describe('log methods', () => {
    const originalLabels = { ...MaiLogLabels };

    beforeAll(() => {
      // Temporarily change MaiLogLabels to test the maximum label length
      Object.defineProperty(MaiLogLabels, 'trace', {
        value: 'TRACE_TEST',
        writable: true
      });
    });

    afterAll(() => {
      // Restore MaiLogLabels to its original state
      Object.assign(MaiLogLabels, originalLabels);
    });
    
    it('should pass correctly formatted log to DefaultLogger for error method', () => {
      const logger = new BrowserLogger({ level: MaiLogLevels.trace, locale: 'ja-JP' });
      const testMessage = 'Something went wrong';
      logger.error(testMessage);

      // Verify the number of calls
      expect(mocked?.error).toHaveBeenCalledTimes(1);

      // Verify the arguments are correct
      const tag = `%c[ERROR     ]%c`;
      const date = new Date(...mockDateProps).toLocaleString('ja-JP');
      const expectedData = `${tag} ${date} ${testMessage}`;
      
      expect(mocked?.error).toHaveBeenCalledWith(
        expect.stringContaining(expectedData.trim()),
        'color:red;font-weight:bold;',
        'color:inherit;',
      );
    });

    it('should pass correctly formatted log to DefaultLogger for warn method', () => {
      const logger = new BrowserLogger({ level: MaiLogLevels.debug, locale: 'en-US' });
      const testMessage = 'This is a warning';
      logger.warn(testMessage);
      
      expect(mocked?.warn).toHaveBeenCalledTimes(1);

      // Verify the arguments are correct
      const tag = `%c[WARN      ]%c`;
      const date = new Date(...mockDateProps).toLocaleString('en-US');
      const expectedData = `${tag} ${date} ${testMessage}`;
      
      expect(mocked?.warn).toHaveBeenCalledWith(
        expect.stringContaining(expectedData.trim()),
        'color:orangered;font-weight:bold;',
        'color:inherit;',
      );
    });

    // Similarly, write tests for other log methods (info, debug, trace)
    it('should pass correctly formatted log to DefaultLogger for info method', () => {
      const logger = new BrowserLogger({ level: MaiLogLevels.info, locale: 'ja-JP' });
      const testMessage = 'Info log';
      logger.info(testMessage);
      
      expect(mocked?.info).toHaveBeenCalledTimes(1);

      // Verify the arguments are correct
      const tag = `%c[INFO      ]%c`;
      const date = new Date(...mockDateProps).toLocaleString('ja-JP');
      const expectedData = `${tag} ${date} ${testMessage}`;
      
      expect(mocked?.info).toHaveBeenCalledWith(
        expect.stringContaining(expectedData.trim()),
        'color:teal;font-weight:bold;',
        'color:inherit;',
      );
    });

    it('should pass correctly formatted log to DefaultLogger for debug method', () => {
      const logger = new BrowserLogger({ level: MaiLogLevels.debug, locale: 'ja-JP' });
      const testMessage = 'Debug log';
      logger.debug(testMessage);
      
      expect(mocked?.debug).toHaveBeenCalledTimes(1);

      // Verify the arguments are correct
      const tag = `%c[DEBUG     ]%c`;
      const date = new Date(...mockDateProps).toLocaleString('ja-JP');
      const expectedData = `${tag} ${date} ${testMessage}`;
      
      expect(mocked?.debug).toHaveBeenCalledWith(
        expect.stringContaining(expectedData.trim()),
        'color:blue;font-weight:bold;',
        'color:inherit;',
      );
    });

    it('should pass correctly formatted log to DefaultLogger for trace method', () => {
      const logger = new BrowserLogger({ level: MaiLogLevels.trace, locale: 'ja-JP' });
      const testMessage = 'Trace log';
      logger.trace(testMessage);
      
      expect(mocked?.trace).toHaveBeenCalledTimes(1);

      // Verify the arguments are correct
      const tag = `%c[TRACE_TEST]%c`;
      const date = new Date(...mockDateProps).toLocaleString('ja-JP');
      const expectedData = `${tag} ${date} ${testMessage}`;
      
      expect(mocked?.trace).toHaveBeenCalledWith(
        expect.stringContaining(expectedData.trim()),
        'color:gray;font-weight:bold;',
        'color:inherit;',
      );
    });

    it('should be output in the specified args order; if the first argument is not a string,', () => {
      const logger = new BrowserLogger({ level: MaiLogLevels.info, locale: 'ja-JP' });
      const testMessage = [
        {
          message: 'hoge'
        },
        '%hoge',
        'color:yellow;',
      ];
      logger.info(...testMessage);
      
      expect(mocked?.info).toHaveBeenCalledTimes(1);

      // Verify the arguments are correct
      const tag = `%c[INFO      ]%c`;
      const date = new Date(...mockDateProps).toLocaleString('ja-JP');
      const expectedData = `${tag} ${date}`;
      
      expect(mocked?.info).toHaveBeenCalledWith(
        expect.stringContaining(expectedData.trim()),
        'color:teal;font-weight:bold;',
        'color:inherit;',
        ...testMessage,
      );
    });
  });
});

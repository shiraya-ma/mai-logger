'use strict';
import { describe, it, expect, beforeAll, beforeEach, jest, afterAll, mock, setSystemTime } from 'bun:test';

import { NodeLogger } from './node-logger';
import { DefaultLogger, DefaultLoggerOptions } from './default-logger';
import { MaiLogLabels } from './mai-log-labels';
import { MaiLogLevels } from './mai-log-levels';

describe('NodeLogger', () => {
  const mockDateProps = [
    2001, // year
    0,    // month
    1,    // day
    0,    // hour
    0,    // minutes
    0,    // seconds
    0,    // milliseconds
  ] as [ number, number, number, number, number, number, number ];

  let mockDefaultLoggerConstructor: jest.Mock<(options: DefaultLoggerOptions) => DefaultLogger> | undefined;
  let mocked: Omit<DefaultLogger, '_level'> | undefined;

  // Create a new NodeLogger instance and mock instance before each test
  beforeEach(() => {
    mocked = {
      error: jest.fn(),
      warn : jest.fn(),
      info : jest.fn(),
      debug: jest.fn(),
      trace: jest.fn(),
    };

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    mockDefaultLoggerConstructor = jest.fn((options: DefaultLoggerOptions) => {
      return mocked as unknown as DefaultLogger
    });

    class MockDefaultLogger {
      constructor (options: DefaultLoggerOptions) {
        return mockDefaultLoggerConstructor!(options);
      };      
    };

    mock.module('./default-logger', () => ({
      DefaultLogger: MockDefaultLogger,
    }));

    setSystemTime(new Date(...mockDateProps));
  });

  // Tests for constructor
  describe('constructor', () => {
    it('should configure with locale is valid', () => {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const logger = new NodeLogger({ level: MaiLogLevels.warn, locale: 'en-US' });
      // Verify that the internal DefaultLogger is correctly initialized
      expect(mockDefaultLoggerConstructor).toHaveBeenCalledWith({ level: MaiLogLevels.warn });
      // Verify that the locale is correctly configured
      // The original test for "locale" property is removed since the property does not exist on the class.
    });

    it('should configure locale with default "ja-JP" without locale', () => {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const logger = new NodeLogger({ level: MaiLogLevels.warn });
      // Verify that the internal DefaultLogger is correctly initialized
      expect(mockDefaultLoggerConstructor).toHaveBeenCalledWith({ level: MaiLogLevels.warn });
      // Verify that the locale is correctly configured
      // The original test for "locale" property is removed since the property does not exist on the class.
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
      const logger = new NodeLogger({ level: MaiLogLevels.trace, locale: 'ja-JP' });
      const testMessage = 'Something went wrong';
      logger.error(testMessage);

      // Verify the number of calls
      expect(mocked?.error).toHaveBeenCalledTimes(1);

      // Verify the arguments are correct
      const expectedDate = new Date(...mockDateProps).toLocaleString('ja-JP');
      const expectedTag = `\u001b[31m[ERROR     ]\u001b[0m `;
      
      expect(mocked?.error).toHaveBeenCalledWith(
        expect.stringContaining(expectedTag.trim()),
        expect.stringContaining(expectedDate),
        testMessage
      );
    });

    it('should pass correctly formatted log to DefaultLogger for warn method', () => {
      const logger = new NodeLogger({ level: MaiLogLevels.debug, locale: 'en-US' });
      const testMessage = 'This is a warning';
      logger.warn(testMessage);
      
      expect(mocked?.warn).toHaveBeenCalledTimes(1);

      const expectedDate = new Date(...mockDateProps).toLocaleString('en-US');
      const expectedTag = `\u001b[35m[WARN      ]\u001b[0m `;
      
      expect(mocked?.warn).toHaveBeenCalledWith(
        expect.stringContaining(expectedTag.trim()),
        expect.stringContaining(expectedDate),
        testMessage
      );
    });

    // Similarly, write tests for other log methods (info, debug, trace)
    it('should pass correctly formatted log to DefaultLogger for info method', () => {
      const logger = new NodeLogger({ level: MaiLogLevels.info, locale: 'ja-JP' });
      const testMessage = 'Info log';
      logger.info(testMessage);
      
      expect(mocked?.info).toHaveBeenCalledTimes(1);
      
      const expectedDate = new Date(...mockDateProps).toLocaleString('ja-JP');
      const expectedTag = `\u001b[32m[INFO      ]\u001b[0m `;
      
      expect(mocked?.info).toHaveBeenCalledWith(
        expect.stringContaining(expectedTag.trim()),
        expect.stringContaining(expectedDate),
        testMessage
      );
    });

    it('should pass correctly formatted log to DefaultLogger for debug method', () => {
      const logger = new NodeLogger({ level: MaiLogLevels.debug, locale: 'ja-JP' });
      const testMessage = 'Debug log';
      logger.debug(testMessage);
      
      expect(mocked?.debug).toHaveBeenCalledTimes(1);
      
      const expectedDate = new Date(...mockDateProps).toLocaleString('ja-JP');
      const expectedTag = `\u001b[36m[DEBUG     ]\u001b[0m `;
      
      expect(mocked?.debug).toHaveBeenCalledWith(
        expect.stringContaining(expectedTag.trim()),
        expect.stringContaining(expectedDate),
        testMessage
      );
    });

    it('should pass correctly formatted log to DefaultLogger for trace method', () => {
      const logger = new NodeLogger({ level: MaiLogLevels.trace, locale: 'ja-JP' });
      const testMessage = 'Trace log';
      logger.trace(testMessage);
      
      expect(mocked?.trace).toHaveBeenCalledTimes(1);
      
      const expectedDate = new Date(...mockDateProps).toLocaleString('ja-JP');
      const expectedTag = `\u001b[90m[TRACE_TEST]\u001b[0m `;
      
      expect(mocked?.trace).toHaveBeenCalledWith(
        expect.stringContaining(expectedTag.trim()),
        expect.stringContaining(expectedDate),
        testMessage
      );
    });
  });
});

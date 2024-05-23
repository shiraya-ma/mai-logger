'use strict';
import { afterEach, beforeEach, describe, expect, it, jest, mock, spyOn } from 'bun:test';

import { MaiLogger } from './mai-logger';

describe('MaiLogger', () => {
    let logger: MaiLogger;

    beforeEach(() => {
        // デフォルトの設定で新しいロガーを作成
        logger = new MaiLogger();
    });

    describe('debug()', () => {
        it('should log debug message correctly', () => {
            console.debug = jest.fn();

            logger = new MaiLogger({ level: 'DEBUG' });

            logger.debug('Debug message');
            
            expect(console.debug).toHaveBeenCalledWith(expect.any(String), expect.any(String), 'Debug message');
        });


        it('should not log debug message when log level is higher', () => {
            console.debug = jest.fn();

            logger = new MaiLogger({ level: (MaiLogger as any)._LOG_LEVEL.INFO });

            logger.debug('Debug message');
            
            expect(console.debug).not.toHaveBeenCalled();
        });
    });

    describe('error()', () => {
        it('should log error message correctly', () => {
            console.error = jest.fn();

            logger.error('Error message');
            
            expect(console.error).toHaveBeenCalledWith(expect.any(String), expect.any(String),'Error message');
        });
    });

    describe('info()', () => {
        it('should log info message correctly', () => {
            console.info = jest.fn();

            logger = new MaiLogger({ level: "INFO" });

            logger.info('Info message');
            
            expect(console.info).toHaveBeenCalledWith(expect.any(String), expect.any(String), 'Info message');
        });

        it('should not log info message when log level is higher', () => {
            console.info = jest.fn();

            logger = new MaiLogger({ level: "WARN" });

            logger.info('Info message');
            
            expect(console.info).not.toHaveBeenCalled();
        });
    });

    describe('trace()', () => {
        it('should log trace message correctly', () => {
            console.debug = jest.fn();

            logger = new MaiLogger({ level: "TRACE" });

            logger.trace('Trace message');
            
            expect(console.debug).toHaveBeenCalledWith(expect.any(String), expect.any(String), 'Trace message');
        });

        it('should not log trace message when log level is higher', () => {
            console.debug = jest.fn();

            logger = new MaiLogger({ level: "DEBUG" });

            logger.trace('Trace message');
            
            expect(console.debug).not.toHaveBeenCalled();
        });
    });

    describe('warn()', () => {
        it('should log warn message correctly', () => {
            console.warn = jest.fn();

            logger = new MaiLogger({ level: "WARN" });

            logger.warn('Warn message');
            
            expect(console.warn).toHaveBeenCalledWith(expect.any(String), expect.any(String), 'Warn message');
        });

        it('should not log warn message when log level is higher', () => {
            console.warn = jest.fn();

            logger = new MaiLogger({ level: "ERROR" });

            logger.warn('Warn message');
            
            expect(console.warn).not.toHaveBeenCalled();
        });
    });
});

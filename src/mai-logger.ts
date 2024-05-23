'use strict';

/**
 * Module for log output
 * 
 * Output in `[LOG_LEVEL] yyyy/mm/dd HH:MM:SS messages` format by default.
 * 
 * @example
 * ```
 * import { MaiLogger } from '@shirayama-mai/mai-logger';
 * 
 * const log = new MaiLogger({ level: 0, locale: 'jp-JA' });
 * 
 * log.trace('hello world!', 'this is MaiLogger.');
 * ```
 * 
 * => `[TRACE] 2024/05/23 17:00:00 hello world! this is MaiLogger`
 */
class MaiLogger {
    protected static readonly _LOG_LEVEL = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
    };

    private readonly _level: number;
    private readonly _locales?: Intl.LocalesArgument;

    /**
     * 
     * @param { MaiLogger.ConstructorOption } option
     * 
     */
    constructor (option?: MaiLogger.ConstructorOption) {
        const level = option?.level || 2;

        if (typeof level === 'number') {
            if (level < 0 || Object.keys(MaiLogger._LOG_LEVEL).length <= level) {
                const error = new Error(`The input value is expected to be a number between 0 and 5. An invalid value outside the valid range was provided.`);
                throw error;
            }

            this._level = level;
        }

        else {
            this._level = MaiLogger._LOG_LEVEL[level];
        }

        this._locales = option?.locale || 'ja-JP';
    }

    /**
     * Methods to output debug logs
     * 
     * @param message 
     * @returns 
     */
    public debug (...message: any) {
        if (MaiLogger._LOG_LEVEL.DEBUG < this._level) return;

        const data = this._getTag('DEBUG').concat(this._getDate(), ...message);

        console.debug(...data);        
    }

    /**
     * Methods to output error logs
     * 
     * @param message 
     * @returns 
     */
    public error (...message: any) {
        if (MaiLogger._LOG_LEVEL.ERROR < this._level) return;

        const data = this._getTag('ERROR').concat(this._getDate(), ...message);

		console.error(...data);        
    }

    /**
     * Methods to output information logs
     * 
     * @param message 
     * @returns 
     */
    public info (...message: any) {
        if (MaiLogger._LOG_LEVEL.INFO < this._level) return;

        const data = this._getTag('INFO').concat(this._getDate(), ...message);

		console.info(...data);      
    }

    /**
     * Methods to output trace logs
     * 
     * @param message 
     * @returns 
     */
    public trace (...message: any) {
        if (MaiLogger._LOG_LEVEL.TRACE < this._level) return;

        const data = this._getTag('TRACE').concat(this._getDate(), ...message);

		console.debug(...data);     
    }

    /**
     * Methods to output warning logs
     * 
     * @param message 
     * @returns 
     */
    public warn (...message: any) {
        if (MaiLogger._LOG_LEVEL.WARN < this._level) return;

        const data = this._getTag('WARN').concat(this._getDate(), ...message);

		console.warn(...data);        
    }

    private _getDate () {
        return new Date().toLocaleString(this._locales);
    }

    private _getTag (tag: MaiLogger.LogLevel) {
        const isWeb = typeof window !== 'undefined';
        
        return isWeb? this._getTagWeb(tag): this._getTagNode(tag);
    }

    private _getTagWeb (tag: MaiLogger.LogLevel): string[] {
        const color = tag === 'ERROR'? 'orangered':
        tag === 'WARN'? 'orange':
        tag === 'INFO'? 'teal':
        tag === 'DEBUG'? 'blue':
        undefined;

        const tage = `${ tag === 'TRACE'? '': '%c' }[${ String(tag).padEnd(5, ' ') }]`;

        const prop = tag === 'TRACE'? undefined: `color: ${ color }`;

        const data = [`${ tag === 'TRACE'? '': '%c' }[${ String(tag).padEnd(5, ' ') }]` ];

        return tag === 'TRACE'? data: data.concat(prop!);
    }

    private _getTagNode (tag: MaiLogger.LogLevel): string[] {
        const color = tag === 'ERROR'? '\u001b[31m':
        tag === 'WARN'? '\u001b[35m':
        tag === 'INFO'? '\u001b[32m':
        tag === 'DEBUG'? '\u001b[36m':
        '\u001b[0m';

        return [`${ color }[${ String(tag).padEnd(5, ' ') }]\u001b[0m`];
    }
};

namespace MaiLogger {
    export type ConstructorOption = {
        /**
         * The most detailed log level to output
         * 
         * @default "INFO"
         */
        level?: number | LogLevel;
        /**
         * Locale to which the date and time displayed in the log conform
         * 
         * @default "jp-JA"
         */
        locale?: Intl.LocalesArgument;
    };

    export type LogLevel = "ERROR" | "DEBUG" | "INFO" | "TRACE" | "WARN";
};

export {
    MaiLogger
};

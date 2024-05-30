'use strict';

import { getColors } from "./colors";
import { format } from "./format";

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

    protected readonly _tagColors: MaiLogger.Colors;

    private readonly _level: number;
    private readonly _locales: Intl.LocalesArgument;

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

        const isWeb = typeof window !== 'undefined';

        this._tagColors = getColors(isWeb);

        this._format = format(isWeb);
    }

    /**
     * Methods to output debug logs
     * 
     * @param message 
     * @returns 
     */
    public debug (...messages: any) {
        if (MaiLogger._LOG_LEVEL.DEBUG < this._level) return;

        const data = this._format({ tag: 'DEBUG', locales: this._locales, messages, tagColors: this._tagColors });

        console.debug(...data);        
    }

    /**
     * Methods to output error logs
     * 
     * @param message 
     * @returns 
     */
    public error (...messages: any) {
        if (MaiLogger._LOG_LEVEL.ERROR < this._level) return;

        const data = this._format({ tag: 'ERROR', locales: this._locales, messages, tagColors: this._tagColors });

		console.error(...data);        
    }

    /**
     * Methods to output information logs
     * 
     * @param message 
     * @returns 
     */
    public info (...messages: any) {
        if (MaiLogger._LOG_LEVEL.INFO < this._level) return;

        const data = this._format({ tag: 'INFO', locales: this._locales, messages, tagColors: this._tagColors });

		console.info(...data);      
    }

    /**
     * Methods to output trace logs
     * 
     * @param message 
     * @returns 
     */
    public trace (...messages: any) {
        if (MaiLogger._LOG_LEVEL.TRACE < this._level) return;

        const data = this._format({ tag: 'TRACE', locales: this._locales, messages, tagColors: this._tagColors });

		console.debug(...data);     
    }

    /**
     * Methods to output warning logs
     * 
     * @param message 
     * @returns 
     */
    public warn (...messages: any) {
        if (MaiLogger._LOG_LEVEL.WARN < this._level) return;

        const data = this._format({ tag: 'WARN', locales: this._locales, messages, tagColors: this._tagColors });

		console.warn(...data);        
    }

    protected _format (option: MaiLogger.FormatOption): string[] {
        return [];
    };

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

    export type Colors = {
        ERROR: string;
        DEBUG: string;
        INFO : string;
        TRACE: string;
        WARN : string;
        DEFAULT: string;
    };

    export type FormatOption = {
        tag: LogLevel;
        locales: Intl.LocalesArgument;
        messages: string[];
        tagColors: Colors;
    };

    export type LogLevel = "ERROR" | "DEBUG" | "INFO" | "TRACE" | "WARN";
};

export {
    MaiLogger
};

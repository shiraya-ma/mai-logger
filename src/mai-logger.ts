'use strict';
import { BrowserLogger } from "./browser-logger";
import { NodeLogger } from "./node-logger";
import { MaiLogFunction, MaiLoggerConstructorOptions, MaiLoggerInterface, MaiLogType } from "./types";

/**
 * Module for log output
 * 
 * Output in `[LOG_LEVEL] yyyy/mm/dd H:MM:SS messages` format by default.
 * 
 * @example
 * ```
 * import { MaiLogger, MaiLogLevels } from '@shiraya-ma/mai-logger';
 * 
 * const log = new MaiLogger({ level: MaiLogLevels.trace, locale: 'ja-JP' });
 * 
 * log.trace('hello world!', 'this is MaiLogger.');
 * ```
 * 
 * => `[TRACE] 2024/05/23 17:00:00 hello world! this is MaiLogger`
 */
class MaiLogger implements MaiLoggerInterface {
  private _log: MaiLoggerInterface;

  constructor (options: MaiLoggerConstructorOptions) {
    const isBrowser = typeof window !== 'undefined';

    this._log = isBrowser? new BrowserLogger(options):
      new NodeLogger(options);

    this.error = this.#createLoggerFunction('error');
    this.warn  = this.#createLoggerFunction('warn');
    this.info  = this.#createLoggerFunction('info');
    this.debug = this.#createLoggerFunction('debug');
    this.trace = this.#createLoggerFunction('trace');
  };

  public error: MaiLogFunction;
  public warn : MaiLogFunction;
  public info : MaiLogFunction;
  public debug: MaiLogFunction;
  public trace: MaiLogFunction;

  #createLoggerFunction (type: MaiLogType): MaiLogFunction {
    return (...data: unknown[]): void => {
      this._log[type](...data);
    };
  };
};

namespace MaiLogger {
  export type ConstructorOptions = MaiLoggerConstructorOptions;

  export type Type = MaiLogType;
};

export {
  MaiLogger,
};

export default MaiLogger;

'use strict';
import { MaiLogLevels } from "./mai-log-levels";

export class DefaultLogger implements MaiLoggerInterface {
  private readonly _level: number;

  constructor (options: DefaultLoggerOptions) {
    const { level } = options;

    this._level = DefaultLogger._getLevel(level);
  };

  private static _getLevel (level: number): number {
    switch (level) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4: {
        return level;
      }
      default: {
        return DefaultLogger._assertLevel(level);
      }
    }
  };

  private static _assertLevel (level: number): never {
    throw new Error(`The input value is expected to be a number between 0 and 4. An invalid value outside the valid range was provided. (level: ${level})`);
  };

  public error: MaiLogFunction = (...data) => {
    if (this._level <= MaiLogLevels.error) {
      console.error(...data);
    }
  };
  public warn : MaiLogFunction = (...data) => {
    if (this._level <= MaiLogLevels.warn) {
      console.warn(...data);
    }
  };
  public info : MaiLogFunction = (...data) => {
    if (this._level <= MaiLogLevels.info) {
      console.info(...data);
    }
  };
  public debug: MaiLogFunction = (...data) => {
    if (this._level <= MaiLogLevels.debug) {
      console.debug(...data);
    }
  };
  public trace: MaiLogFunction = (...data) => {
    if (this._level <= MaiLogLevels.trace) {
      console.debug(...data);
    }
  };
};

export type DefaultLoggerOptions = {
  /**
   * The most detailed log level to output
   * 
   * @default "INFO"
   */
  level: number;
};
'use strict';
import { DefaultLogger } from "./default-logger";
import {
  MaiLogFunction,
  MaiLoggerConstructorOptions,
  MaiLoggerFormatOptions,
  MaiLoggerInterface,
  MaiLogLabels,
  MaiLogType,
} from "./types";

export class NodeLogger implements MaiLoggerInterface {
  protected static readonly _COLORS: Record<MaiLogType | 'init', string> = {
    error : '\u001b[31m',
    debug : '\u001b[36m',
    info  : '\u001b[32m',
    trace : '\u001b[90m',
    warn  : '\u001b[35m',
    init  : '\u001b[0m',
  } as const;

  private readonly _log: DefaultLogger;
  private readonly _locale: Intl.LocalesArgument | undefined;
  private readonly _maxLabelLength: number;

  get locale () {
    return this._locale;
  };

  constructor (options?: MaiLoggerConstructorOptions) {
    this._log = new DefaultLogger({
      level: options?.level,
    });
    this._locale = options?.locale ?? "ja-JP";

    this._maxLabelLength = Math.max(
      ...Object.values(MaiLogLabels).map(l => l.length)
    );

    this.error = this._createLogFunction('error');
    this.warn  = this._createLogFunction('warn');
    this.info  = this._createLogFunction('info');
    this.debug = this._createLogFunction('debug');
    this.trace = this._createLogFunction('trace');
  };

  public error: MaiLogFunction
  public warn : MaiLogFunction;
  public info : MaiLogFunction;
  public debug: MaiLogFunction;
  public trace: MaiLogFunction;

  private _format (options: MaiLoggerFormatOptions): unknown[] {
    const {
      type,
      data,
    } = options;

    const tag = [
      NodeLogger._COLORS[type],
      `[${MaiLogLabels[type].padEnd(this._maxLabelLength, ' ')}]`,
      NodeLogger._COLORS.init,
      ' '
    ].join('');

    const date = new Date().toLocaleString(this._locale);

    return [
      tag,
      date,
      ...data,
    ];
  };

  private _createLogFunction (type: MaiLogType): MaiLogFunction {
    return (...data) => {
      this._log[type](
        ...this._format({
          type,
          data,
        }),
      );
    };
  };
};

'use strict';
import { DefaultLogger, type DefaultLoggerOptions } from "./default-logger";
import { MaiLogLabels } from "./mai-log-labels";

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

  get locale () {
    return this._locale;
  };

  constructor (options: NodeLoggerOptions) {
    this._log = new DefaultLogger({
      level: options.level,
    });
    this._locale = options.locale ?? "ja-JP";
  };

  public error: MaiLogFunction = (...data) => {
    this._log.error(...this._format({
      type: 'error',
      data,
    }));
  };
  public warn: MaiLogFunction = (...data) => {
    this._log.warn(...this._format({
      type: 'warn',
      data,
    }));
  };
  public info: MaiLogFunction = (...data) => {
    this._log.info(...this._format({
      type: 'info',
      data,
    }));
  };
  public debug: MaiLogFunction = (...data) => {
    this._log.debug(...this._format({
      type: 'debug',
      data,
    }));
  };
  public trace: MaiLogFunction = (...data) => {
    this._log.trace(...this._format({
      type: 'trace',
      data,
    }));
  };

  private _format (options: MaiLoggerFormatOptions): unknown[] {
    const {
      type,
      data,
    } = options;

    const maxLabelLength = Math.max(
      ...Object.values(MaiLogLabels).map(l => l.length)
    );

    const tag = [
      NodeLogger._COLORS[type],
      `[${MaiLogLabels[type].padEnd(maxLabelLength, ' ')}]`,
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
};

export type NodeLoggerOptions = DefaultLoggerOptions & {
  /**
   * Locale to which the date and time displayed in the log conform
   * 
   * @default "ja-JP"
   */
  locale?: Intl.LocalesArgument;
};

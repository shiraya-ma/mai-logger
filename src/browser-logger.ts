'use strict';
import { DefaultLogger } from "./default-logger";
import { MaiLogLabels } from "./mai-log-labels";

export class BrowserLogger implements MaiLoggerInterface {
  protected static readonly _COLORS: Record<MaiLogType | 'init', string> = {
    error : 'red',
    debug : 'blue',
    info  : 'teal',
    trace : 'gray',
    warn  : 'orangered',
    init  : 'inherit',
  } as const;

  private readonly _log: DefaultLogger;
  private readonly _locale: Intl.LocalesArgument | undefined;
  private readonly _maxLabelLength: number;

  get locale () {
    return this._locale;
  };

  constructor (options?: MaiLoggerOptions) {
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

  public error: MaiLogFunction;
  public warn : MaiLogFunction;
  public info : MaiLogFunction;
  public debug: MaiLogFunction;
  public trace: MaiLogFunction;

  private _format (options: MaiLoggerFormatOptions): unknown[] {
    const { type, data } = options;

    const tag = `%c[${MaiLogLabels[type].padEnd(this._maxLabelLength, ' ')}]%c`;
    const date = `${new Date().toLocaleString(this._locale)}`;

    const header = `${tag} ${date}`;

    const tagStyle = `color:${BrowserLogger._COLORS[type]};font-weight:bold;`;
    const initStyle = `color:${BrowserLogger._COLORS.init};`;

    if (typeof data[0] === 'string') {
      return [
        `${header} ${data[0]}`,
        tagStyle,
        initStyle,
        ...data.slice(1),
      ];
    }

    return [
      header,
      tagStyle,
      initStyle,
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

/** @internal */
export type _FilterDataProps = {
  messages  : unknown[];
  styles    : string[];
};

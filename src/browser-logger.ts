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
  private readonly _styleRegExp: RegExp;

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

    this._styleRegExp = BrowserLogger.genStyleRegExp();

    this.error = this._createLogFunction('error');
    this.warn  = this._createLogFunction('warn');
    this.info  = this._createLogFunction('info');
    this.debug = this._createLogFunction('debug');
    this.trace = this._createLogFunction('trace');
  };

  protected static genStyleRegExp (): RegExp {
    const props = [
      'background',
      'border',
      'border-radius',
      'box-decoration-break',
      'box-shadow',
      'clear', 'float',
      'color',
      'cursor',
      'display',
      'font',
      'line-height',
      'margin',
      'outline',
      'padding',
      'text-.+',
      'white-space',
      'word-spacing', 'word-break',
      'writing-mode',
    ].join('|');

    const styleRegExp = new RegExp(`^(\\s*(${props})\\s*:\\s*\\S+\\s*;)*(\\s*(${props})\\s*:\\s*\\S+\\s*)$`);

    return styleRegExp;
  };

  public error: MaiLogFunction;
  public warn : MaiLogFunction;
  public info : MaiLogFunction;
  public debug: MaiLogFunction;
  public trace: MaiLogFunction;

  private _filterData (data: unknown[]): _FilterDataProps {
    const initialValue: _FilterDataProps = {
      messages  : [],
      styles    : [],
    };

    const filterDataProps: _FilterDataProps = data.reduce<_FilterDataProps>((prev, data) => {
      const { messages, styles } = prev;

      if (typeof data !== 'string') {
        const addData = typeof data === 'object'? JSON.stringify(data): data;

        return {
          messages: [ ...messages, addData ],
          styles,
        };
      }

      if (!this._styleRegExp.test(data)) {
        return {
          messages: [ ...messages, data ],
          styles,
        };
      }

      return {
        messages,
        styles: [ ...styles, data ],
      }
    }, initialValue);

    return filterDataProps;
  };

  private _format (options: MaiLoggerFormatOptions): unknown[] {
    const { type, data } = options;

    const tag = `%c[${MaiLogLabels[type].padEnd(this._maxLabelLength, ' ')}]%c`;
    const date = `${new Date().toLocaleString(this._locale)}`;

    const header = `${tag} ${date}`;

    const tagStyle = `color:${BrowserLogger._COLORS[type]};font-weight:bold;`;
    const initStyle = `color:${BrowserLogger._COLORS.init};`;

    const { messages, styles } = this._filterData(data);

    const jointMessage = [
      header,
      ...messages,
    ].join(' ');

    return [
      jointMessage,
      tagStyle,
      initStyle,
      ...styles,
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

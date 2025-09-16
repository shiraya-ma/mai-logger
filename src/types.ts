'use strict';

export type Brand<K, T> = K & { __brand: T };

export const MaiLogLevels = {
  trace: 0,
  debug: 1,
  info : 2,
  warn : 3,
  error: 4,
} as const;

export type MaiLogType = keyof typeof MaiLogLevels;

export type MaiLogLabel = Brand<
  'ERROR' | 'DEBUG' | 'INFO' | 'TRACE' | 'WARN',
  'MaiLogLabel'
>;

export const MaiLogLabels: Record<MaiLogType, MaiLogLabel> = {
  trace: 'TRACE' as MaiLogLabel,
  debug: 'DEBUG' as MaiLogLabel,
  info : 'INFO'  as MaiLogLabel,
  warn : 'WARN'  as MaiLogLabel,
  error: 'ERROR' as MaiLogLabel,
};

export type MaiLogFunction = (...data: unknown[]) => void;

export interface MaiLoggerInterface {
  trace: MaiLogFunction;
  debug: MaiLogFunction;
  info : MaiLogFunction;
  warn : MaiLogFunction;
  error: MaiLogFunction;
};

export type DefaultLoggerConstructorOptions = Partial<{
  /**
   * The most detailed log level to output
   * 
   * @default "INFO"
   */
  level: number;
}>;

export type MaiLoggerConstructorOptions = DefaultLoggerConstructorOptions & Partial<{
  /**
  * Locale to which the date and time displayed in the log conform
  * 
  * @default "ja-JP"
  */
  locale?: Intl.LocalesArgument;
}>;

/** @internal */
export type MaiLoggerFormatOptions = {
  type: MaiLogType; 
  data: unknown[];
};

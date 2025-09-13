'use strict';
import type {} from 'bun';
import { MaiLogLevels } from './mai-log-levels';

declare global {
  export type Brand<K, T> = K & { __brand: T };

  export type MaiLogType = keyof typeof MaiLogLevels;
  export type MaiLogLabel = Brand<
    'ERROR' | 'DEBUG' | 'INFO' | 'TRACE' | 'WARN',
    'MaiLogLabel',
  >;

  export type MaiLogFunction = (...data: unknown[]) => void;

  export interface MaiLoggerInterface {
    trace: MaiLogFunction;
    debug: MaiLogFunction;
    info : MaiLogFunction;
    warn : MaiLogFunction;
    error: MaiLogFunction;
  };

  /** @internal */
  export type MaiLoggerFormatOptions = {
    type: MaiLogType; 
    data: unknown[];
  };
};

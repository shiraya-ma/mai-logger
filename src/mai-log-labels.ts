'use strict';

export const MaiLogLabels: Record<MaiLogType, MaiLogLabel> = {
  trace: 'TRACE' as MaiLogLabel,
  debug: 'DEBUG' as MaiLogLabel,
  info : 'INFO'  as MaiLogLabel,
  warn : 'WARN'  as MaiLogLabel,
  error: 'ERROR' as MaiLogLabel,
  init : 'INIT'  as MaiLogLabel,
};

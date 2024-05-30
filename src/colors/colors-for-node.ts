// colorsForNode
'use string';
import type { MaiLogger } from "src/mai-logger";

export const colorsForNode: MaiLogger.Colors = {
    ERROR: '\u001b[31m',
    DEBUG: '\u001b[36m',
    INFO : '\u001b[32m',
    TRACE: '\u001b[0m',
    WARN : '\u001b[35m',
    DEFAULT: '\u001b[0m'
};

// formatForNode
'use strict';
import type { MaiLogger } from "src/mai-logger";

export function formatForNode (option: MaiLogger.FormatOption) {
    const { tag, locales, messages, tagColors } = option;
    
    const _tag = `${ tagColors[ tag ] }[${ tag.padEnd(5, ' ')}]${ tagColors.DEFAULT }`;

    const _date = new Date().toLocaleString(locales);

    return [
        _tag,
        _date,
        ...messages
    ];
};

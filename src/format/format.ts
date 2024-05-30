// format
'use strict';

import { formatForNode } from "./format-for-node";
import { formatForWeb } from "./format-for-web";

export function format (isWeb: boolean) {
    return isWeb? formatForWeb: formatForNode;
};

// getColors
'use strict';

import { colorsForNode } from "./colors-for-node";
import { colorsForWeb } from "./colors-for-web";

export function getColors (isWeb: boolean) {
    return isWeb? colorsForWeb: colorsForNode;
};

'use strict';
import { copyFileSync, existsSync, rmSync } from 'fs';
import { resolve } from 'path';

const rootdir = resolve(__dirname, '..');
const srcIndexHTML = resolve(rootdir, '.bun', 'index.html');
const distIndexHTML = resolve(rootdir, 'index.html');

if (existsSync(distIndexHTML)) {
  rmSync(distIndexHTML);
  console.log(`Removed: ${distIndexHTML}`);
}

copyFileSync(srcIndexHTML, distIndexHTML);
console.log(`Copied: ${srcIndexHTML} -> ${distIndexHTML}`);

'use strict';
import { existsSync, rmdirSync, rmSync } from 'fs';
import { resolve } from 'path';

const rootdir = resolve(__dirname, '..');
const distIndexHTML = resolve(rootdir, 'index.html');
const distdir = resolve(rootdir, 'dist');

if (existsSync(distIndexHTML)) {
  rmSync(distIndexHTML);
  console.log(`Removed: ${distIndexHTML}`);
}

if (existsSync(distdir)) {
  rmdirSync(distdir, { recursive: true });
  console.log(`Removed: ${distdir}`);
}

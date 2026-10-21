import fs from 'node:fs/promises';import crypto from 'node:crypto';
// Incremental build for the standalone public loader only. Server source is unchanged.
await fs.access('dist/server/index.js');
await fs.copyFile('public/live-site.js','dist/client/live-site.js');
const hash=async path=>crypto.createHash('sha256').update(await fs.readFile(path)).digest('hex');
if(await hash('public/live-site.js')!==await hash('dist/client/live-site.js'))throw Error('Public loader mismatch');
console.log('Verified incremental public loader output; server bundle unchanged.');

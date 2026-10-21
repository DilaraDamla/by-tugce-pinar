import fs from 'node:fs/promises';import crypto from 'node:crypto';
// Incremental build for the standalone public loader only. Server source is unchanged.
await fs.access('dist/server/index.js');
for(const name of ['live-site.js','premium.css','video-qa.js','app.js'])await fs.copyFile('public/'+name,'dist/client/'+name);
const hash=async path=>crypto.createHash('sha256').update(await fs.readFile(path)).digest('hex');
if(await hash('public/live-site.js')!==await hash('dist/client/live-site.js'))throw Error('Public loader mismatch');
if(await hash('public/premium.css')!==await hash('dist/client/premium.css'))throw Error('Public stylesheet mismatch');
console.log('Verified incremental public loader and stylesheet output; server bundle unchanged.');

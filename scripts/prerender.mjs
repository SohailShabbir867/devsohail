import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const rootDir = process.cwd();
const distHtmlPath = path.join(rootDir, 'dist', 'index.html');
const ssrDir = path.join(rootDir, '.ssr');
const ssrEntryPath = path.join(ssrDir, 'entry-server.js');

try {
  const { render } = await import(pathToFileURL(ssrEntryPath).href);
  const appHtml = render();
  const template = fs.readFileSync(distHtmlPath, 'utf-8');
  const marker = '<div id="root"></div>';

  if (!template.includes(marker)) {
    throw new Error(`Could not find ${marker} in ${distHtmlPath}`);
  }

  const finalHtml = template.replace(marker, `<div id="root">${appHtml}</div>`);
  fs.writeFileSync(distHtmlPath, finalHtml, 'utf-8');
  console.log(`Pre-rendered static HTML into ${distHtmlPath} (${appHtml.length} chars)`);
} finally {
  fs.rmSync(ssrDir, { recursive: true, force: true });
}

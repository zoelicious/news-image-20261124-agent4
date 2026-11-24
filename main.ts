// news-image-20261124 entry (Agent 4): copies the newspaper image built in
// this session to the grader output directory. Node 22, standard library only.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
try {
  mkdirSync(outDir, { recursive: true });
} catch {
  // The output directory may already exist; a missing one is created above.
}
const src = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');
copyFileSync(src, dest);
// The grader runs this program twice and demands identical bytes: confirm the
// copy landed whole before exiting, so a partial write fails loudly instead
// of silently shipping a truncated image.
if (statSync(dest).size !== statSync(src).size) {
  throw new Error('entry.png copy size mismatch');
}

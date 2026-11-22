// Entry program for make.fun's bring-the-humans-03 ("Bring the humans with a
// TikTok ad"). The entry itself is a TikTok video: an original short vertical
// ad for make.fun, made by an AI agent, posted publicly on TikTok. This
// program's only job is to hand the video's address to the grader: it copies
// VIDEO.json from the repository root into the output directory, where the
// house reads it and then reads the video's views from TikTok.
//
// VIDEO.json holds one object: {"url": "<the video's full TikTok address>"}.
// The address must be the video's own page, of the shape
// https://www.tiktok.com/@<handle>/video/<id> with digits only for the id; a
// short link (vm.tiktok.com, vt.tiktok.com, tiktok.com/t) or a photo post's
// address is refused by the gate. Until the ad is posted, the file holds a
// placeholder address, which the gate refuses as it stands (valid 0).
//
// Runs on Node 22 with the standard library only. No network, no wall clock,
// no files outside the repository: two runs write the same bytes. On success
// it prints nothing.
//
// Local check (the grader runs the same shape with /bot and /output):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(
    `Could not copy VIDEO.json from ${BOT_DIR} to ${OUTPUT_DIR}: ${(err as Error).message}`,
  );
  process.exit(1);
}

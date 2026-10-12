// Writes WebP copies of the larger screenshots at the widths they're displayed at, next to each JPEG
// (e.g. post-editor.jpg → post-editor-800.webp). The JPEGs stay as the fallback and the lightbox image.
// Run with `node scripts/optimize-images.mjs` after replacing one of these images.
import sharp from 'sharp';

const IMAGES = [
  'public/images/blog-composer/post-editor.jpg',
  'public/images/blog-composer/dashboard.jpg',
  'public/images/the-cb-creative/thumbnail.jpg',
];
/** Must match the widths listed in src/data/projects.ts. Widths at or over an image's own are skipped. */
const WIDTHS = [480, 800, 1200, 1600];
const QUALITY = Number(process.env.QUALITY ?? 85);

for (const file of IMAGES) {
  const { width } = await sharp(file).metadata();
  for (const target of WIDTHS.filter((w) => w < width)) {
    const out = file.replace(/\.jpg$/, `-${target}.webp`);
    await sharp(file).resize({ width: target }).webp({ quality: QUALITY, smartSubsample: true, effort: 6 }).toFile(out);
    console.log(out);
  }
}

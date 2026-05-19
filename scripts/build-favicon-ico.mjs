// One-shot script: render public/favicon.svg → public/favicon.ico as a PNG-in-ICO
// container. Run with: `node scripts/build-favicon-ico.mjs` from the blog root.
// Source-of-truth is favicon.svg; the .ico exists only as a legacy fallback for
// browsers that prefer .ico over .svg (some Safari + Edge legacy contexts).
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const svgBuf = readFileSync('public/favicon.svg');
const pngBuf = await sharp(svgBuf).resize(32, 32).png().toBuffer();

const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);             // reserved
header.writeUInt16LE(1, 2);             // type = ICO
header.writeUInt16LE(1, 4);             // image count
header.writeUInt8(32, 6);               // width (32)
header.writeUInt8(32, 7);               // height (32)
header.writeUInt8(0, 8);                // palette colors (0 = no palette)
header.writeUInt8(0, 9);                // reserved
header.writeUInt16LE(1, 10);            // color planes
header.writeUInt16LE(32, 12);           // bits per pixel
header.writeUInt32LE(pngBuf.length, 14); // image data size
header.writeUInt32LE(22, 18);           // image data offset

const icoBuf = Buffer.concat([header, pngBuf]);
writeFileSync('public/favicon.ico', icoBuf);
console.log(`Wrote public/favicon.ico (${icoBuf.length} bytes; PNG payload ${pngBuf.length} bytes)`);

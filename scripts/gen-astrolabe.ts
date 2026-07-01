import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  const zai = await ZAI.create();
  console.log('Generating astrolabe.png...');
  const response = await zai.images.generations.create({
    prompt: `Medieval brass astronomical instrument with intricate engravings, astronomical markings and star charts, calligraphy around the rim, multiple rotating discs and a pointer, golden brass with green patina in recessed areas, photographed from directly above on dark midnight blue velvet background, dramatic museum lighting highlighting the engravings, 12th century scientific instrument, extremely detailed, museum quality photograph`,
    size: '1024x1024',
  });
  const buffer = Buffer.from(response.data[0].base64, 'base64');
  const outPath = '/home/z/my-project/public/images/sdam/astrolabe.png';
  fs.writeFileSync(outPath, buffer);
  console.log(`✓ Saved: ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

main().catch((e) => { console.error(e); process.exit(1); });

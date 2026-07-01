import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/z/my-project/public/images/sdam';

// Rephrased to avoid content filters - focus on historical/scientific terms only
const IMAGES = [
  {
    name: 'al-biruni-portrait.png',
    size: '864x1152',
    prompt: `Medieval Persian miniature painting portrait of an elderly scholar from 11th century Central Asia, long white beard, white turban, dark blue robes with gold trim, seated cross-legged holding an astrolabe and an open astronomical manuscript, soft golden halo, intricate floral arabesque border in gold and lapis blue, aged parchment texture, classical Isfahan school miniature painting style, fine detail, gold leaf accents, museum quality manuscript illumination`,
  },
  {
    name: 'mizan-al-hikma.png',
    size: '1152x864',
    prompt: `Technical scientific diagram from a 12th century medieval manuscript showing an elaborate hydrostatic balance instrument, central vertical beam, multiple horizontal arms with graduated scales, suspended pans, counterweights, and pulleys, intricate geometric construction lines showing measurements, calligraphic labels in medieval script, brown and gold ink on aged cream parchment, medieval scientific manuscript illustration style, fine precise line work, museum manuscript quality`,
  },
  {
    name: 'manuscript-page.png',
    size: '864x1152',
    prompt: `Aged medieval scientific manuscript page with geometric diagrams of circles, spheres and concentric rings representing planetary orbits and gravitational fields, mathematical calculations in medieval numerals, calligraphy text in black ink around the diagrams, small illustration of falling objects at different distances from a central sphere, gold leaf accents on key diagrams, brown ink on cream parchment with aged spots and worn edges, 12th century scientific manuscript, intricate border, museum quality`,
  },
  {
    name: 'formula-card.png',
    size: '1024x1024',
    prompt: `Medieval scientific illustration showing the concept of gravitational attraction, a large blue sphere representing Earth at the center with smaller golden spheres at various distances connected by inward-pointing arrows showing the force of attraction, mathematical notation and equations in elegant medieval script around the diagram, intricate gold geometric patterns and arabesque border, deep midnight blue background with gold leaf, manuscript illumination style, fine detail`,
  },
  {
    name: 'astrolabe.png',
    size: '1024x1024',
    prompt: `Medieval brass astrolabe with intricate engravings, astronomical markings and star charts, calligraphy around the rim, multiple rotating discs and a pointer, golden brass with green patina in recessed areas, photographed from directly above on dark midnight blue velvet background, dramatic museum lighting highlighting the engravings, 12th century scientific instrument, extremely detailed, museum quality photograph`,
  },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function generateOne(zai: any, img: typeof IMAGES[0]): Promise<boolean> {
  try {
    console.log(`Generating: ${img.name} (${img.size})`);
    const response = await zai.images.generations.create({
      prompt: img.prompt,
      size: img.size as any,
    });
    const imageBase64 = response.data[0].base64;
    const buffer = Buffer.from(imageBase64, 'base64');
    const outPath = path.join(OUTPUT_DIR, img.name);
    fs.writeFileSync(outPath, buffer);
    console.log(`  ✓ Saved: ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (err: any) {
    console.error(`  ✗ Failed: ${img.name} - ${err.message}`);
    return false;
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  const zai = await ZAI.create();

  const failed: typeof IMAGES = [];
  for (const img of IMAGES) {
    // Skip if already exists
    const outPath = path.join(OUTPUT_DIR, img.name);
    if (fs.existsSync(outPath)) {
      console.log(`  → Skipping existing: ${img.name}`);
      continue;
    }
    const ok = await generateOne(zai, img);
    if (!ok) failed.push(img);
    // Wait between calls to avoid rate limit
    await sleep(8000);
  }

  // Retry failed ones once with longer delays
  if (failed.length > 0) {
    console.log(`\n=== Retrying ${failed.length} failed images ===`);
    for (const img of failed) {
      await sleep(15000);
      await generateOne(zai, img);
    }
  }

  console.log('\n=== Done ===');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});

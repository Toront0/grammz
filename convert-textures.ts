import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const INPUT_DIR = path.join(process.cwd(), "public", "textures");
const OUTPUT_DIR = path.join(process.cwd(), "public", "textures_ktx2");

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Input folder not found at: ${INPUT_DIR}`);
    return;
  }

  const files = fs.readdirSync(INPUT_DIR);
  const pngFiles = files.filter((f) => f.toLowerCase().endsWith(".png"));

  if (pngFiles.length === 0) {
    console.log(`⚠️ No .png files found inside ${INPUT_DIR}`);
    return;
  }

  console.log(
    `🚀 Processing ${pngFiles.length} prepared textures into matching .ktx2 files (keeping original names)...`
  );

  for (const file of pngFiles) {
    const baseName = file.substring(0, file.lastIndexOf("."));

    // Keeps your pre-configured exact filename intact, changing only the extension
    const outputName = `${baseName}.ktx2`;

    const relativeInput = `./public/textures/${file}`;
    const relativeOutput = `./public/textures_ktx2/${outputName}`;

    try {
      // FIXED ORDER: Input path comes FIRST, Output path comes LAST
      const command = `ktx create --format R8G8B8A8_SRGB --encode uastc --generate-mipmap "${relativeInput}" "${relativeOutput}"`;

      execSync(command, { stdio: "ignore" });
      console.log(`✅ Converted: ${file} -> ${outputName}`);
    } catch (error) {
      console.error(`❌ Failed processing file ${file}.`);
    }
  }

  console.log(
    "\n🎉 Complete! Your optimized textures are ready inside: public/textures_ktx2/"
  );
}

main().catch(console.error);

// // import { execSync } from "child_process";
// // import fs from "fs";
// // import path from "path";

// // const INPUT_DIR = path.join(process.cwd(), "public", "textures");
// // const OUTPUT_DIR = path.join(process.cwd(), "public", "textures_ktx2");

// // async function main() {
// //   if (!fs.existsSync(OUTPUT_DIR)) {
// //     fs.mkdirSync(OUTPUT_DIR, { recursive: true });
// //   }

// //   if (!fs.existsSync(INPUT_DIR)) {
// //     console.error(`❌ Input folder not found at: ${INPUT_DIR}`);
// //     return;
// //   }

// //   const files = fs.readdirSync(INPUT_DIR);
// //   const pngFiles = files.filter((f) => f.toLowerCase().endsWith(".png"));

// //   if (pngFiles.length === 0) {
// //     console.log(`⚠️ No .png files found inside ${INPUT_DIR}`);
// //     return;
// //   }

// //   console.log(
// //     `🚀 Found ${pngFiles.length} PNG textures. Processing KTX2 compilation via system 'ktx create'...`
// //   );

// //   for (const file of pngFiles) {
// //     const outputName = file.substring(0, file.lastIndexOf(".")) + ".ktx2";

// //     // Using unified forward slashes to keep the native binary completely happy on Windows
// //     const relativeInput = `./public/textures/${file}`;
// //     const relativeOutput = `./public/textures_ktx2/${outputName}`;

// //     try {
// //       // FIXED ORDER: [inputPath] comes first, [outputPath] is the final positional argument!
// //       const command = `ktx create --format R8G8B8A8_SRGB --encode uastc --generate-mipmap "${relativeInput}" "${relativeOutput}"`;

// //       execSync(command, { stdio: "inherit" });
// //       console.log(`✅ Converted: ${file} -> ${outputName}`);
// //     } catch (error) {
// //       console.error(`❌ Failed processing file ${file}.`);
// //     }
// //   }

// //   console.log(
// //     "\n🎉 Complete! Your optimized textures are ready inside: public/textures_ktx2/"
// //   );
// // }

// // main().catch(console.error);

// import { execSync } from "child_process";
// import fs from "fs";
// import path from "path";
// import sharp from "sharp";

// const INPUT_DIR = path.join(process.cwd(), "public", "textures");
// const OUTPUT_DIR = path.join(process.cwd(), "public", "textures_ktx2");

// async function main() {
//   if (!fs.existsSync(OUTPUT_DIR)) {
//     fs.mkdirSync(OUTPUT_DIR, { recursive: true });
//   }

//   if (!fs.existsSync(INPUT_DIR)) {
//     console.error(`❌ Input folder not found at: ${INPUT_DIR}`);
//     return;
//   }

//   const files = fs.readdirSync(INPUT_DIR);
//   const pngFiles = files.filter((f) => f.toLowerCase().endsWith(".png"));

//   if (pngFiles.length === 0) {
//     console.log(`⚠️ No .png files found inside ${INPUT_DIR}`);
//     return;
//   }

//   console.log(
//     `🚀 Processing ${pngFiles.length} textures into matching 4K (PC) & 2K (Mobile) variants...`
//   );

//   for (const file of pngFiles) {
//     const inputPath = path.join(INPUT_DIR, file);
//     const baseName = file.substring(0, file.lastIndexOf("."));

//     // Clean up name variations if they already have _4k in them
//     const pureName = baseName.replace(/_4k\$/i, "");

//     try {
//       // --- PHASE 1: GENERATE DESKTOP 4K KTX2 ---
//       const output4k = `./public/textures_ktx2/${pureName}_4k.ktx2`;
//       const relativeInput = `./public/textures/${file}`;

//       // FIXED ORDER: Input path comes FIRST, Output path comes LAST
//       const cmd4k = `ktx create --format R8G8B8A8_SRGB --encode uastc --generate-mipmap "${relativeInput}" "${output4k}"`;
//       execSync(cmd4k, { stdio: "ignore" });
//       console.log(`✅ 4K Compiled: ${pureName}_4k.ktx2`);

//       // --- PHASE 2: GENERATE MOBILE 2K KTX2 ---
//       const output2k = `./public/textures_ktx2/${pureName}_2k.ktx2`;
//       const tempPngPath = `./public/textures/temp_${file}`;

//       // Downscale master PNG array down to 2K via sharp first
//       await sharp(inputPath)
//         .resize(2048, 2048, { fit: "fill" })
//         .toFile(tempPngPath);

//       // FIXED ORDER: Input path comes FIRST, Output path comes LAST
//       const cmd2k = `ktx create --format R8G8B8A8_SRGB --encode uastc --generate-mipmap "${tempPngPath}" "${output2k}"`;
//       execSync(cmd2k, { stdio: "ignore" });

//       // Clean up the temporary intermediate file from disk safely
//       fs.unlinkSync(tempPngPath);
//       console.log(`📱 2K Compiled: ${pureName}_2k.ktx2`);
//     } catch (error) {
//       console.error(`❌ Failed processing variants for file ${file}.`);
//     }
//   }

//   console.log(
//     "\n🎉 Complete! Dynamic high/low responsive sheets are sitting inside public/textures_ktx2/"
//   );
// }

// main().catch(console.error);

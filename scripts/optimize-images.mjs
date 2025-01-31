import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import kleur from 'kleur';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'src');
const outputDir = path.join(__dirname, '..', 'src', 'optimized');

// Configuration for different image types
const optimizationConfig = {
    jpeg: { quality: 80, mozjpeg: true },
    png: { quality: 80, compressionLevel: 9 },
    webp: { quality: 75 }
};

// Create directory recursively
async function ensureDir(dir) {
    try {
        await fs.mkdir(dir, { recursive: true });
    } catch (error) {
        if (error.code !== 'EEXIST') throw error;
    }
}

// Get all image files recursively
async function getImageFiles(dir) {
    const items = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(items.map(async item => {
        const filePath = path.join(dir, item.name);
        if (item.isDirectory()) {
            return getImageFiles(filePath);
        } else if (/\.(jpe?g|png|webp)$/i.test(item.name)) {
            return filePath;
        }
        return [];
    }));
    return files.flat();
}

async function optimizeImage(inputPath) {
    const relativePath = path.relative(sourceDir, inputPath);
    const outputPath = path.join(outputDir, relativePath);
    const ext = path.extname(inputPath).toLowerCase();
    
    try {
        // Ensure output directory exists
        await ensureDir(path.dirname(outputPath));
        
        let sharpInstance = sharp(inputPath)
            .resize({
                width: 1200, // Max width
                height: 1200, // Max height
                fit: 'inside',
                withoutEnlargement: true
            });
        
        // Apply format-specific optimizations
        switch (ext) {
            case '.jpg':
            case '.jpeg':
                sharpInstance = sharpInstance.jpeg(optimizationConfig.jpeg);
                break;
            case '.png':
                sharpInstance = sharpInstance.png(optimizationConfig.png);
                break;
            case '.webp':
                sharpInstance = sharpInstance.webp(optimizationConfig.webp);
                break;
        }
        
        await sharpInstance.toFile(outputPath);
        
        // Get file sizes for comparison
        const inputSize = (await fs.stat(inputPath)).size;
        const outputSize = (await fs.stat(outputPath)).size;
        const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(2);
        
        console.log(
            kleur.green('✓') + ' ' +
            kleur.blue(relativePath) + '\n  ' +
            kleur.gray(`${(inputSize / 1024).toFixed(2)}KB → ${(outputSize / 1024).toFixed(2)}KB (${savings}% smaller)`)
        );
        
    } catch (error) {
        console.error(kleur.red('✗') + ' Failed to optimize ' + kleur.blue(relativePath));
        console.error('  ' + kleur.red(error.message));
    }
}

async function main() {
    try {
        console.log(kleur.bold().cyan('🖼  Starting image optimization...\n'));
        
        // Ensure output directory exists
        await ensureDir(outputDir);
        
        // Get all image files
        const imageFiles = await getImageFiles(sourceDir);
        
        if (imageFiles.length === 0) {
            console.log(kleur.yellow('No images found to optimize.'));
            return;
        }
        
        console.log(kleur.bold(`Found ${imageFiles.length} images to optimize...\n`));
        
        // Process all images
        await Promise.all(imageFiles.map(file => optimizeImage(file)));
        
        console.log(kleur.bold().green('\n✨ Image optimization complete!'));
        
    } catch (error) {
        console.error(kleur.bold().red('\n❌ Error:'), error.message);
        process.exit(1);
    }
}

// Run the optimization
main();

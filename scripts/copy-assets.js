const fs = require('fs-extra');
const path = require('path');

async function copyAssets() {
  try {
    const distDir = path.join(__dirname, '../dist');
    const srcGeojsonDir = path.join(__dirname, '../src/geojson');
    const distSrcGeojsonDir = path.join(distDir, 'src', 'geojson'); // 目标位置：dist/src/geojson


    // 1. 确保 dist/src/geojson 目录存在
    await fs.ensureDir(distSrcGeojsonDir);

    // 2. 复制 src/geojson 目录的所有内容到 dist/src/geojson
    await fs.copy(srcGeojsonDir, distSrcGeojsonDir, {
      filter: (src) => {
        return !src.includes('node_modules') && !src.includes('.git');
      }
    });


    console.log('✅ 资源文件复制完成！');
    console.log('📦 复制内容：src/目录下的所有文件');
    console.log('📂 目标位置：dist/');
  } catch (err) {
    console.error('❌ 资源文件处理失败：', err);
    process.exit(1);
  }
}

copyAssets(); 
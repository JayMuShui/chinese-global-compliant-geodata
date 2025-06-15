const fs = require('fs-extra');
const path = require('path');

const geojsonDir = path.join(__dirname, '..', 'src', 'geojson');

async function findJsonFiles(dir) {
  const files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await findJsonFiles(fullPath));
    } else if (item.isFile() && item.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function minifyGeoJSON() {
  console.log('开始压缩 GeoJSON 文件...');

  try {
    const files = await findJsonFiles(geojsonDir);
    console.log(`找到 ${files.length} 个 JSON 文件`);

    for (const file of files) {
      console.log(`正在处理文件: ${file}`);
      try {
        const fileContent = await fs.readFile(file, 'utf8');
        // 用 JSON.stringify 压缩成一行
        const minified = JSON.stringify(JSON.parse(fileContent));
        await fs.writeFile(file, minified, 'utf8');
        console.log(`文件压缩完成: ${file}`);
      } catch (error) {
        console.error(`处理文件 ${file} 时出错:`, error);
      }
    }

    console.log('GeoJSON 文件压缩操作完成！');
  } catch (error) {
    console.error('遍历目录时出错:', error);
  }
}

minifyGeoJSON(); 
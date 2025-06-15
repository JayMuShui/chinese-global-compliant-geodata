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

async function formatGeoJSON() {
  console.log('开始格式化 GeoJSON 文件...');
  try {
    const files = await findJsonFiles(geojsonDir);
    console.log(`找到 ${files.length} 个 JSON 文件`);
    for (const file of files) {
      console.log(`正在处理文件: ${file}`);
      try {
        const fileContent = await fs.readFile(file, 'utf8');
        const formatted = JSON.stringify(JSON.parse(fileContent), null, 2);
        await fs.writeFile(file, formatted, 'utf8');
        console.log(`文件格式化完成: ${file}`);
      } catch (error) {
        console.error(`处理文件 ${file} 时出错:`, error);
      }
    }
    console.log('GeoJSON 文件格式化操作完成！');
  } catch (error) {
    console.error('遍历目录时出错:', error);
  }
}

formatGeoJSON(); 
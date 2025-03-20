/**
 * 删除JSON数据文件脚本
 * 由于我们已经将所有数据转换为JS模块，不再需要原始JSON文件
 */

const fs = require('fs-extra');
const path = require('path');

async function removeJsonFiles() {
  try {
    // 数据目录
    const dataDir = path.resolve(__dirname, '../src/data');
    
    // 读取数据目录中的文件
    const files = await fs.readdir(dataDir);
    
    // 过滤出JSON文件
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    // 删除每个JSON文件
    console.log('正在删除JSON数据文件...');
    let count = 0;
    
    for (const file of jsonFiles) {
      const filePath = path.join(dataDir, file);
      await fs.remove(filePath);
      console.log(`已删除: ${file}`);
      count++;
    }
    
    console.log(`\n已成功删除 ${count} 个JSON文件。`);
    
    // 检查复制脚本是否仍引用JSON文件
    const copyDataScript = path.resolve(__dirname, '../copy-data.cjs');
    if (fs.existsSync(copyDataScript)) {
      console.log(`\n发现旧的JSON复制脚本: ${copyDataScript}`);
      console.log('正在删除旧的复制脚本...');
      await fs.remove(copyDataScript);
      console.log('已删除旧的复制脚本。');
    }
    
    console.log('\n数据清理完成！');
  } catch (error) {
    console.error('删除JSON文件时出错:', error);
    process.exit(1);
  }
}

removeJsonFiles(); 
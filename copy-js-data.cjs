const fs = require('fs-extra');
const path = require('path');

async function copyJsDataFiles() {
  try {
    // 源目录和目标目录
    const srcDir = path.resolve(__dirname, 'src/data');
    const destDir = path.resolve(__dirname, 'dist/src/data');
    const publicDestDir = path.resolve(__dirname, 'dist/data');

    // 确保目标目录存在
    await fs.ensureDir(destDir);
    await fs.ensureDir(publicDestDir);

    // 读取源目录中的文件
    const files = await fs.readdir(srcDir);
    
    // 过滤，只保留JS文件
    const jsFiles = files.filter(file => 
      file.endsWith('.js') && !file.includes('.bak') && fs.statSync(path.join(srcDir, file)).isFile()
    );
    
    // 复制每个文件到主目录结构中
    console.log('正在复制JS数据文件到 dist/src/data ...');
    for (const file of jsFiles) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      await fs.copy(srcFile, destFile);
      console.log(`复制: ${file}`);
    }
    
    // 同时复制到 dist/data 目录，作为备用
    console.log('\n正在复制JS数据文件到 dist/data ...');
    for (const file of jsFiles) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(publicDestDir, file);
      await fs.copy(srcFile, destFile);
      console.log(`复制: ${file}`);
    }

    console.log(`\nJS数据文件复制完成！共复制 ${jsFiles.length} 个文件。`);
  } catch (error) {
    console.error('复制JS数据文件时出错:', error);
    process.exit(1);
  }
}

copyJsDataFiles(); 
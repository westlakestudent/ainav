const fs = require('fs-extra');
const path = require('path');

async function cleanBackupFiles() {
  try {
    const dataDir = path.resolve(__dirname, 'src/data');
    
    // 读取目录中的所有文件
    const files = await fs.readdir(dataDir);
    
    let removedCount = 0;
    
    // 过滤出备份文件并删除
    for (const file of files) {
      if (file.includes('.bak')) {
        const filePath = path.join(dataDir, file);
        await fs.remove(filePath);
        console.log(`已删除: ${file}`);
        removedCount++;
      }
    }
    
    console.log(`\n清理完成! 共删除 ${removedCount} 个备份文件。`);
  } catch (error) {
    console.error('删除备份文件时出错:', error);
    process.exit(1);
  }
}

cleanBackupFiles(); 
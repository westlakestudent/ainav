/**
 * 清理脚本 - 在构建前移除旧文件
 */

const fs = require('fs-extra');
const path = require('path');

async function cleanup() {
  try {
    // 清理dist目录
    const distDir = path.resolve(__dirname, '../dist');
    if (fs.existsSync(distDir)) {
      console.log('正在删除旧的dist目录...');
      await fs.remove(distDir);
      console.log('旧的dist目录已删除');
    }

    // 检查并删除备份文件
    const backupCount = await removeBackupFiles();
    console.log(`共删除 ${backupCount} 个备份文件`);
    
    console.log('清理完成！');
  } catch (error) {
    console.error('清理过程中出错:', error);
    // 不退出进程，允许构建继续
  }
}

async function removeBackupFiles() {
  let count = 0;
  
  // 检查src目录下的备份文件
  const srcDir = path.resolve(__dirname, '../src');
  
  // 递归查找备份文件
  const findBackupFiles = async (dir) => {
    const files = await fs.readdir(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        // 递归处理子目录
        await findBackupFiles(fullPath);
      } else if (file.name.includes('.bak') || file.name.endsWith('~')) {
        // 删除备份文件
        console.log(`删除备份文件: ${fullPath}`);
        await fs.remove(fullPath);
        count++;
      }
    }
  };
  
  await findBackupFiles(srcDir);
  return count;
}

cleanup(); 
/**
 * 将JSON文件转换为JS模块的脚本
 * 用法: node json2js.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 源目录和目标目录
const SRC_DIR = path.join(__dirname, '../src/data');
const DEST_DIR = path.join(__dirname, '../src/data/js');

// 确保目标目录存在
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// 获取所有JSON文件
const jsonFiles = fs.readdirSync(SRC_DIR).filter(file => file.endsWith('.json'));

// 处理每个JSON文件
jsonFiles.forEach(jsonFile => {
  const filePath = path.join(SRC_DIR, jsonFile);
  const content = fs.readFileSync(filePath, 'utf8');
  
  try {
    // 解析JSON内容
    const data = JSON.parse(content);
    
    // 创建JS模块内容
    const jsContent = `// ${path.basename(jsonFile, '.json')} 数据
export default ${JSON.stringify(data, null, 2)}`;
    
    // 生成JS文件名
    const jsFileName = jsonFile.replace('.json', '.js');
    const destPath = path.join(DEST_DIR, jsFileName);
    
    // 写入JS文件
    fs.writeFileSync(destPath, jsContent);
    console.log(`转换成功: ${jsonFile} -> ${jsFileName}`);
  } catch (err) {
    console.error(`转换失败 ${jsonFile}: ${err.message}`);
  }
});

console.log('所有JSON文件已转换为JS模块。'); 
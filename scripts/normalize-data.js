/**
 * 规范化JS数据文件的脚本
 * 1. 将description字段重命名为desc
 * 2. 移除多余的字段
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 源目录
const DATA_DIR = path.join(__dirname, '../src/data/js');

// 获取所有JS文件
const jsFiles = fs.readdirSync(DATA_DIR).filter(file => file.endsWith('.js') && file !== 'index.js');

// 处理每个JS文件
jsFiles.forEach(jsFile => {
  const filePath = path.join(DATA_DIR, jsFile);
  
  try {
    // 读取文件内容
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 首先将所有description替换为desc
    content = content.replace(/"description":/g, '"desc":');
    
    // 尝试提取导出的数据对象
    const match = content.match(/export default\s*({[\s\S]*})/);
    if (!match) {
      console.error(`无法提取数据对象: ${jsFile}`);
      return;
    }
    
    try {
      // 解析JSON对象
      const dataStr = match[1].replace(/export default /g, '');
      const data = JSON.parse(dataStr);
      
      // 确保主对象有name而不是category_name
      if (data.category_name && !data.name) {
        data.name = data.category_name;
        delete data.category_name;
      }
      
      // 从sites数组中移除description并将其转换为desc
      if (data.sites && Array.isArray(data.sites)) {
        data.sites = data.sites.map(site => {
          const newSite = { ...site };
          if (newSite.description && !newSite.desc) {
            newSite.desc = newSite.description;
            delete newSite.description;
          }
          return newSite;
        });
      }
      
      // 创建新的JS文件内容
      const newContent = `// ${path.basename(jsFile, '.js')} 数据
export default ${JSON.stringify(data, null, 2)}`;
      
      // 写回文件
      fs.writeFileSync(filePath, newContent);
      console.log(`规范化成功: ${jsFile}`);
    } catch (jsonError) {
      // 如果JSON解析失败，尝试使用简单的替换方式
      console.warn(`JSON解析失败，使用模式替换: ${jsFile}`);
      fs.writeFileSync(filePath, content);
    }
  } catch (err) {
    console.error(`处理文件失败 ${jsFile}: ${err.message}`);
  }
});

console.log('所有JS数据文件已规范化完成。'); 
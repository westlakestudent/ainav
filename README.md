# AI导航网站

一个精心设计的AI工具导航网站，旨在帮助用户发现和使用各类AI工具和服务。本站收集了数百个国内外优质AI工具，包括大模型、开发工具、图像生成、视频与音频处理等多个类别。

## 📋 项目特点

- **分类明确**：将AI工具按功能类别清晰分类，便于用户快速找到所需工具
- **中外兼顾**：收录了主流国外AI产品与国内优质AI服务，满足不同用户的需求
- **按热度排序**：各类别中的工具按受欢迎程度排序，热门工具优先展示
- **响应式设计**：完美适配桌面和移动设备，提供一致的用户体验
- **优化的图标加载**：智能处理网站图标，确保界面美观统一

## 🗂️ 项目结构

```
/
├── public/               # 静态资源文件夹
├── src/                  # 源代码目录
│   ├── assets/           # 图片、字体等资源
│   ├── components/       # Vue组件
│   │   ├── SiteCard.vue  # 网站卡片组件
│   │   ├── SiteIcon.vue  # 网站图标组件
│   │   └── ...
│   ├── data/             # 数据文件
│   │   ├── index.json    # 分类索引
│   │   ├── 1_ai平台与基础设施.json
│   │   ├── 2_ai大模型.json
│   │   └── ...
│   ├── App.vue           # 主应用组件
│   └── main.js           # 应用入口
├── index.html            # HTML模板
├── vite.config.js        # Vite配置
├── package.json          # 依赖和脚本
└── README.md             # 项目说明
```

## 📊 数据结构

每个类别数据文件（如`2_ai大模型.json`）包含以下结构：

```json
{
  "category_name": "AI大模型",
  "sites": [
    {
      "id": 1,
      "name": "网站名称",
      "url": "https://网站链接",
      "icon": "图标URL（可选）",
      "description": "网站简介"
    },
    // 更多网站...
  ]
}
```

## 🌟 主要功能

- **分类浏览**：用户可通过导航菜单查看不同类别的AI工具
- **搜索功能**：支持按关键词搜索工具名称和描述
- **外链跳转**：点击卡片直接访问相应工具网站
- **自适应布局**：在不同设备上提供最佳视觉体验

## 💻 技术栈

- **Vue.js 3**：前端框架
- **Vite**：构建工具
- **JavaScript (ES6+)**：编程语言
- **CSS3**：样式和动画

## 🚀 部署说明

### Vercel部署

1. 克隆仓库到本地：
   ```bash
   git clone <仓库地址>
   cd ai-tools-nav
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 构建生产版本：
   ```bash
   npm run build
   ```

4. 将项目连接到Vercel：
   - 注册并登录[Vercel](https://vercel.com/)
   - 创建新项目并导入您的Git仓库
   - 按照指引完成部署

### 本地开发

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 在浏览器中访问：`http://localhost:5173`

## 🔄 更新维护

- 所有网站数据存储在`src/data/`目录下的JSON文件中
- 需要添加新工具时，请在相应类别JSON文件中添加新条目
- 更新后记得重新构建和部署项目

## 📝 许可证

MIT License

## 👨‍💻 贡献

欢迎提交Issues或Pull Requests来完善本项目，让我们一起构建最好的AI工具导航！

## 使用说明

1. 点击"添加分类"可以创建新的导航分类
2. 在"添加网站"区域选择分类，填写网站信息，点击添加
3. 每个网站卡片右上角的"×"按钮可以删除该网站
4. 每个分类右上角的"×"按钮可以删除该分类及其包含的所有网站

## 数据存储

所有数据存储在浏览器的本地存储中，清除浏览器数据可能会导致已保存的导航信息丢失。

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

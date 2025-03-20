# AI导航网站部署指南

此文档提供了如何将AI导航网站部署到各种托管平台的详细步骤。

## 构建项目

在部署之前，您需要先构建项目：

```bash
# 安装依赖
npm install

# 构建项目
npm run build
```

成功构建后，所有静态文件将生成在`dist`目录中。

## 部署到Vercel

### 自动部署（推荐）

1. 注册/登录 [Vercel](https://vercel.com)
2. 点击"New Project"
3. 导入您的Git仓库
4. 配置项目：
   - 构建命令：`npm run build`
   - 输出目录：`dist`
   - 环境变量：根据需要添加
5. 点击"Deploy"

Vercel会自动检测这是一个Vue项目并应用适当的构建设置。每次您将更改推送到Git仓库时，Vercel都会自动重新部署您的网站。

### 手动部署

如果您想手动部署，可以使用Vercel CLI：

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel
```

按照提示操作，选择输出目录为`dist`。

## 部署到GitHub Pages

1. 在GitHub上创建一个新仓库
2. 将您的项目推送到该仓库
3. 修改`vite.config.js`文件，添加基本路径：

```js
export default defineConfig({
  base: '/YOUR_REPO_NAME/',
  // 其他配置...
})
```

4. 创建`.github/workflows/deploy.yml`文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.4
        with:
          branch: gh-pages
          folder: dist
```

5. 推送更改到GitHub
6. 在仓库设置中，启用GitHub Pages，选择`gh-pages`分支作为源

## 部署到Netlify

1. 注册/登录 [Netlify](https://netlify.com)
2. 点击"New site from Git"
3. 选择您的Git提供商并选择您的仓库
4. 配置构建设置：
   - 构建命令：`npm run build`
   - 发布目录：`dist`
5. 点击"Deploy site"

## 部署到服务器

如果您想部署到自己的服务器，只需将`dist`目录中的所有文件上传到您的Web服务器的根目录。

对于Nginx服务器，推荐的配置如下：

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/your/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

## 性能检查

部署完成后，建议使用以下工具检查您网站的性能：

1. [Google PageSpeed Insights](https://pagespeed.web.dev/)
2. [GTmetrix](https://gtmetrix.com/)
3. [WebPageTest](https://www.webpagetest.org/)

## 故障排除

如果您在访问网站时遇到问题：

1. 检查浏览器控制台是否有错误
2. 确认JS数据文件是否正确部署到`dist/data/js/`和`dist/src/data/js/`目录
3. 验证`vercel.json`文件中的配置是否正确
4. 检查网络请求是否被CORS策略阻止 
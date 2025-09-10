# 📦 Render手动部署说明

## 准备上传包

1. 将整个 `D:\product-review-agent` 文件夹压缩成 ZIP 文件
2. 确保ZIP包含以下关键文件：
   - ✅ package.json
   - ✅ dify-integration/render-adapter.js
   - ✅ 所有源代码文件
   - ❌ 不包含 node_modules（已被.gitignore排除）

## Render部署步骤

### 1. 登录Render
访问 https://render.com

### 2. 创建Web Service
- 点击 "New +" → "Web Service"
- 选择 "Deploy without Git" 或类似选项

### 3. 上传文件
- 上传您的ZIP文件
- 或者选择"Connect a Git Repository"然后手动连接

### 4. 配置设置
```
Name: product-review-agent-api
Environment: Node
Build Command: npm install
Start Command: node dify-integration/render-adapter.js
```

### 5. 环境变量
```
NODE_ENV=production
DIFY_REGION=china
LANGFUSE_ENABLED=false
```

## 🎯 备选方案：其他平台

如果Render上传也有问题，还可以使用：

### Vercel (推荐备选)
- 访问 https://vercel.com
- 直接拖拽文件夹部署
- 使用我们准备好的 vercel.json 配置

### Railway
- 访问 https://railway.app
- 支持直接上传项目

### Heroku
- 传统但稳定的PaaS平台
- 支持多种部署方式

选择其中一种即可！
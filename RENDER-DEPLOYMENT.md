# 🚀 Render 部署指南

## 📋 部署步骤

### 方法一：GitHub 连接部署（推荐）

#### 1. 将代码推送到 GitHub
```bash
# 如果还没有 Git 仓库
cd D:\product-review-agent
git init
git add .
git commit -m "Initial commit: Product Review Agent with Render deployment"

# 在 GitHub 创建新仓库，然后：
git remote add origin https://github.com/YOUR_USERNAME/product-review-agent.git
git branch -M main
git push -u origin main
```

#### 2. 在 Render 创建新服务
1. 登录 [Render.com](https://render.com)
2. 点击 "New +" → "Web Service"
3. 连接您的 GitHub 仓库
4. 选择 `product-review-agent` 仓库

#### 3. 配置部署设置
```
Name: product-review-agent-api
Environment: Node
Region: Singapore (推荐，距离中国较近)
Branch: main
Build Command: npm install
Start Command: node dify-integration/render-adapter.js
```

#### 4. 设置环境变量
```
NODE_ENV=production
DIFY_REGION=china
LANGFUSE_ENABLED=false
PORT=10000
```

### 方法二：直接上传部署

#### 1. 在 Render 创建服务
1. 选择 "Deploy from Git" 或 "Manual Deploy"
2. 上传您的项目文件夹

## 🔧 本地测试 Render 适配器

在部署前，先本地测试：

```bash
cd D:\product-review-agent
node dify-integration/render-adapter.js
```

访问 http://localhost:10000/health 确认正常工作。

## ✅ 部署成功后

### 1. 获取您的 API 地址
部署成功后，您会得到类似这样的地址：
```
https://product-review-agent-api-xxxx.onrender.com
```

### 2. 测试 API 端点
```bash
# 健康检查
curl https://your-app.onrender.com/health

# 测试搜索
curl -X POST https://your-app.onrender.com/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"手机推荐","budget":3000}'
```

### 3. 更新 Dify 配置
在 Dify 中将 API 工具的地址更新为：

**商品搜索API**
```
URL: https://your-app.onrender.com/api/search
```

**评价分析API**
```
URL: https://your-app.onrender.com/api/analyze-reviews
```

**智能推荐API**
```
URL: https://your-app.onrender.com/api/recommend
```

## 🎯 完整架构

部署后的最终架构：
```
前端 (https://ai-agent-crd7.bolt.host)
  ↓
Dify 工作流 (app-gNvGNGxztpOW6bNKRWiAuzSm)
  ↓
后端 API (https://your-app.onrender.com) ✅ 部署到 Render
```

## 💡 优化建议

### Render 付费方案优势
- 更快的启动时间
- 更多的计算资源
- 99.9% 的可用性保证
- 支持自定义域名

### 性能监控
访问 `https://your-app.onrender.com/api/stats` 查看系统状态。

## 🚀 开始部署

现在就开始：
1. 选择部署方法（推荐 GitHub 连接）
2. 按步骤配置
3. 等待部署完成
4. 测试 API
5. 更新 Dify 配置

需要我帮助您完成任何步骤吗？
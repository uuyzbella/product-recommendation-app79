# 🚀 API无法调用问题解决方案

## 问题原因
您的前端部署在 `https://ai-agent-crd7.bolt.host`，无法直接访问本地的 `localhost:3001` API。

## 📡 解决方案

### 方案A: 部署后端到云端 (推荐)

#### 1. 使用 Vercel 部署
```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 部署到 Vercel
cd D:\product-review-agent
vercel --prod

# 3. 获得公网URL，例如：
# https://product-review-agent-xxx.vercel.app
```

#### 2. 使用 Railway 部署
```bash
# 1. 安装 Railway CLI
npm install -g @railway/cli

# 2. 登录并部署
railway login
railway up

# 3. 获得公网URL
```

#### 3. 使用 Render 部署
- 将代码推送到 GitHub
- 在 Render.com 连接 GitHub 仓库
- 选择 `dify-integration/vercel-adapter.js` 作为入口点

### 方案B: 使用内网穿透

#### 1. 安装 ngrok
```bash
# 下载 ngrok: https://ngrok.com/download
# 注册账号获取 authtoken

# 启动隧道
ngrok http 3001
```

#### 2. 使用 localtunnel
```bash
npm install -g localtunnel
lt --port 3001
```

## 🔧 配置前端API地址

部署完成后，在您的前端代码中更新API地址：

```javascript
// 从
const API_BASE_URL = 'http://localhost:3001';

// 改为（使用您的实际域名）
const API_BASE_URL = 'https://your-backend-domain.vercel.app';
```

## 📋 API端点列表

部署完成后，以下端点将可用：

```
GET  /health                    - 健康检查
POST /api/search                - 商品搜索  
POST /api/analyze-reviews       - 评价分析
POST /api/recommend             - 智能推荐
POST /api/chat                  - 完整对话
GET  /api/capabilities          - 系统能力
```

## 🧪 测试部署

部署完成后，使用以下命令测试：

```bash
# 替换为您的实际域名
curl https://your-domain.vercel.app/health

# 测试搜索API
curl -X POST https://your-domain.vercel.app/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"手机推荐","budget":3000}'
```

## ✅ 推荐流程

1. **立即方案**: 使用 Vercel 一键部署
2. **获取公网URL**: 例如 `https://product-review-agent-xxx.vercel.app`
3. **更新前端配置**: 将API地址指向新域名
4. **在Dify中更新**: 将API工具的URL更新为公网地址
5. **测试完整流程**: 确认前端→Dify→后端链路正常

现在就可以开始部署了！
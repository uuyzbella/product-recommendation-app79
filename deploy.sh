#!/bin/bash

# 商品测评推荐Agent - 生产环境部署脚本

echo "🚀 开始部署商品测评推荐Agent..."

# 创建必要的目录
echo "📁 创建日志目录..."
mkdir -p logs

# 安装依赖
echo "📦 安装生产环境依赖..."
npm ci --only=production

# 运行测试
echo "🧪 运行测试..."
npm run test

# 构建项目
echo "🔨 构建项目..."
npm run build

# 复制生产环境配置
echo "⚙️ 配置生产环境..."
cp .env.production .env

# 启动PM2服务
echo "🔄 启动PM2服务..."
pm2 delete all 2>/dev/null || true
pm2 start ecosystem.config.js --env production

# 保存PM2配置
pm2 save
pm2 startup

echo "✅ 部署完成！"
echo ""
echo "🌐 服务端点:"
echo "  - API服务器: http://localhost:3000"
echo "  - Dify适配器: http://localhost:3001"  
echo "  - Web界面: http://localhost:3002"
echo ""
echo "📊 查看服务状态: pm2 status"
echo "📝 查看日志: pm2 logs"
echo "🔄 重启服务: pm2 restart all"
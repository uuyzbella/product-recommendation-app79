#!/bin/bash

# 快速启动脚本 - 开发和测试用

echo "🚀 启动商品测评推荐Agent (开发模式)..."

# 检查Node.js版本
node_version=$(node -v 2>/dev/null)
if [ $? -ne 0 ]; then
    echo "❌ 请先安装Node.js (版本16+)"
    exit 1
fi

echo "✅ Node.js版本: $node_version"

# 安装依赖
echo "📦 安装依赖..."
npm install

# 启动服务
echo "🔄 启动所有服务..."

# 后台启动API服务器
echo "启动API服务器 (端口3000)..."
npm run api &
api_pid=$!

# 等待API服务启动
sleep 3

# 后台启动Dify适配器
echo "启动Dify适配器 (端口3001)..."
DIFY_PORT=3001 node dify-integration/start-dify-adapter.js &
dify_pid=$!

# 等待Dify适配器启动
sleep 2

# 启动Web界面
echo "启动Web界面 (端口3002)..."
PORT=3002 node src/ui/WebInterface.js &
web_pid=$!

# 等待所有服务启动
sleep 3

echo ""
echo "🎉 所有服务已启动！"
echo ""
echo "🌐 访问地址:"
echo "  📡 API服务: http://localhost:3000"
echo "  🔗 Dify适配器: http://localhost:3001"  
echo "  🖥️ Web界面: http://localhost:3002"
echo ""
echo "🧪 测试Dify连接:"
echo "  curl http://localhost:3001/health"
echo ""
echo "⏹️ 停止所有服务: Ctrl+C"

# 等待用户中断
trap "echo '🛑 停止所有服务...'; kill $api_pid $dify_pid $web_pid 2>/dev/null; exit 0" INT

# 保持脚本运行
wait
# 商品测评推荐Agent

一个基于AI的商品测评推荐系统，支持多电商平台数据聚合与智能推荐。

## 功能特色

- ✅ 多平台数据聚合（淘宝、Temu、Amazon等）
- ✅ 智能商品评价分析
- ✅ 个性化推荐算法
- ✅ 实时价格监控
- ✅ 商品排行榜生成
- ✅ 用户偏好学习

## 技术架构

```
├── src/
│   ├── agents/          # AI Agent核心逻辑
│   ├── core/           # 核心业务逻辑
│   ├── models/         # 数据模型定义
│   ├── platforms/      # 平台适配器
│   ├── utils/          # 工具函数
│   └── ui/             # 用户界面
├── config/             # 配置文件
├── data/              # 数据存储
├── tests/             # 测试用例
└── docs/              # 文档
```

## 快速开始

1. 安装依赖：`npm install` 或 `pip install -r requirements.txt`
2. 配置环境：复制 `config/config.example.json` 到 `config/config.json` 并填写API密钥
3. 启动服务：`npm start` 或 `python main.py`
4. 访问Web界面：http://localhost:3000

## 支持平台

- 🛍️ 淘宝 (Taobao)
- 🛒 Temu
- 📦 Amazon
- 🛍️ 京东 (JD.com)
- 🛒 拼多多 (PDD)
- 🌐 其他电商平台（可扩展）
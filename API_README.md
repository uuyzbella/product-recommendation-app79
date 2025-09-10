# 商品推荐 API 服务器

基于现有的商品评论 Agent，新增了 Supabase 数据库集成的 RESTful API 服务。

## 🚀 快速启动

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
确保 `.env` 文件包含以下配置：
```env
SUPABASE_URL=https://akzdaxficvnhdvxwchzz.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
PORT=3000
NODE_ENV=development
```

### 3. 启动 API 服务器
```bash
# 开发模式（自动重启）
npm run api:dev

# 生产模式
npm run api
```

服务器将在 `http://localhost:3000` 启动。

## 📖 API 端点文档

### 基础信息
- **健康检查**: `GET /health`
- **API 文档**: `GET /api`

### 商品相关 API

#### 搜索商品
```http
GET /api/products/search?query=手机&category=电子产品&minPrice=1000&maxPrice=5000
```

参数：
- `query`: 搜索关键词
- `category`: 商品分类
- `minPrice`: 最低价格
- `maxPrice`: 最高价格  
- `brand`: 品牌名称
- `rating`: 最低评分
- `limit`: 返回数量（默认20）
- `offset`: 偏移量（默认0）

#### 获取商品详情
```http
GET /api/products/{productId}
```

#### 个性化推荐
```http
GET /api/products/recommendations/{userId}?limit=10
```

### 评论分析 API

#### 分析商品评论
```http
GET /api/reviews/analyze/{productId}
```

返回：
- 评论总数
- 平均评分
- 评分分布
- 情感分析
- 关键词提取
- 最新评论

#### 获取商品评论
```http
GET /api/reviews/product/{productId}?limit=20&offset=0&sortBy=created_at&order=desc
```

#### 创建新评论
```http
POST /api/reviews
Content-Type: application/json

{
  "product_id": "uuid",
  "user_id": "uuid", 
  "rating": 5,
  "comment": "很好的商品！"
}
```

### 价格比较 API

#### 价格对比
```http
GET /api/price/compare/{productId}
```

#### 价格历史
```http
GET /api/price/history/{productId}?days=30&storeId=uuid
```

#### 价格提醒管理
```http
# 获取用户价格提醒
GET /api/price/alerts/{userId}

# 创建价格提醒
POST /api/price/alerts
{
  "user_id": "uuid",
  "product_id": "uuid",
  "target_price": 999.99,
  "alert_type": "below"
}

# 删除价格提醒
DELETE /api/price/alerts/{alertId}
```

## 🗄️ 数据库表结构

需要在 Supabase 中创建以下表：

### products (商品表)
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR,
  brand VARCHAR,
  price DECIMAL(10,2),
  image_url VARCHAR,
  avg_rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### reviews (评论表)
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  user_id UUID,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### stores (商店表)
```sql
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  url VARCHAR,
  logo_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### product_prices (商品价格表)
```sql
CREATE TABLE product_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  store_id UUID REFERENCES stores(id),
  price DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### price_history (价格历史表)
```sql
CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  store_id UUID REFERENCES stores(id),
  price DECIMAL(10,2) NOT NULL,
  recorded_at TIMESTAMP DEFAULT NOW()
);
```

### price_alerts (价格提醒表)
```sql
CREATE TABLE price_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  product_id UUID REFERENCES products(id),
  target_price DECIMAL(10,2) NOT NULL,
  alert_type VARCHAR DEFAULT 'below',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### user_purchases (用户购买历史表)
```sql
CREATE TABLE user_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  product_id UUID REFERENCES products(id),
  purchase_date TIMESTAMP DEFAULT NOW()
);
```

## 🛡️ 安全特性

- **Helmet**: 安全头部防护
- **CORS**: 跨域资源共享配置
- **Rate Limiting**: 请求频率限制（100次/15分钟）
- **输入验证**: 严格的参数验证
- **错误处理**: 统一的错误响应格式

## 📊 监控和日志

- **Morgan**: HTTP 请求日志
- **健康检查**: 服务状态监控
- **错误日志**: 详细的错误信息记录
- **性能指标**: 服务运行时间和版本信息

## 🔧 开发说明

### 项目结构
```
src/
├── api/
│   ├── server.js          # 主服务器文件
│   └── routes/
│       ├── products.js    # 商品路由
│       ├── reviews.js     # 评论路由
│       └── price.js       # 价格路由
├── config/
│   └── supabase.js        # Supabase 配置
└── ... (其他现有文件)
```

### 可用的 NPM 脚本
- `npm run api`: 启动生产环境 API 服务器
- `npm run api:dev`: 启动开发环境 API 服务器（自动重启）
- `npm run start`: 启动原始 Agent 程序
- `npm run web`: 启动 Web 界面
- `npm run test`: 运行测试套件

## 🌐 API 测试示例

### 使用 curl 测试

```bash
# 健康检查
curl --noproxy "*" http://localhost:3000/health

# API 文档
curl --noproxy "*" http://localhost:3000/api

# 搜索商品
curl --noproxy "*" "http://localhost:3000/api/products/search?query=手机&limit=5"

# 分析评论（需要先有数据）
curl --noproxy "*" http://localhost:3000/api/reviews/analyze/product-id
```

### 使用 JavaScript 测试

```javascript
// 搜索商品
fetch('http://localhost:3000/api/products/search?query=手机')
  .then(response => response.json())
  .then(data => console.log(data));

// 创建评论
fetch('http://localhost:3000/api/reviews', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    product_id: 'uuid',
    user_id: 'uuid',
    rating: 5,
    comment: '非常好的商品！'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

现在你的商品推荐系统已经具备了完整的 API 服务功能，可以支持前端应用或其他服务的集成！
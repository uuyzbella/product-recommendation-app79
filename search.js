/**
 * Vercel API 路由：商品搜索
 * 路径：/api/search
 */

module.exports = async (req, res) => {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // 处理预检请求
    if (req.method === 'OPTIONS') {
        return res.status(200).json({ success: true });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed',
            allowedMethods: ['POST', 'OPTIONS']
        });
    }

    try {
        const { query, platforms, budget, language, limit = 10 } = req.body;

        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Missing or invalid query parameter',
                code: 'INVALID_QUERY',
                timestamp: new Date().toISOString()
            });
        }

        // 模拟搜索结果
        const mockResults = Array.from({ length: Math.min(limit, 5) }, (_, index) => ({
            id: `product_${Date.now()}_${index}`,
            title: `${query} - 推荐商品${index + 1}`,
            description: `高品质${query}，用户评价良好，性价比优秀`,
            price: budget ? Math.round(budget * (0.6 + index * 0.1)) : 1999 + index * 500,
            originalPrice: budget ? Math.round(budget * (0.8 + index * 0.1)) : 2599 + index * 600,
            currency: 'CNY',
            rating: parseFloat((4.2 + Math.random() * 0.7).toFixed(1)),
            reviewCount: Math.floor(Math.random() * 2000) + 100,
            platform: platforms?.[index % platforms.length] || 'taobao',
            brand: `品牌${index + 1}`,
            category: '电子产品',
            imageUrl: `https://example.com/product_${index + 1}.jpg`,
            url: `https://example.com/product/${Date.now()}_${index}`,
            inStock: true,
            shipping: {
                free: Math.random() > 0.3,
                time: `${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 3) + 7}天`
            },
            features: ['正品保证', '全国联保', '7天无理由退货']
        }));

        return res.status(200).json({
            success: true,
            count: mockResults.length,
            results: mockResults,
            metadata: {
                query,
                platforms: platforms || ['taobao'],
                budget,
                language: language || 'zh-CN',
                searchTime: new Date().toISOString(),
                processingTimeMs: Math.floor(Math.random() * 500) + 100
            },
            pagination: {
                page: 1,
                limit,
                total: mockResults.length,
                hasMore: false
            }
        });

    } catch (error) {
        console.error('Search API error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal server error',
            timestamp: new Date().toISOString(),
            deployment: 'vercel-api-routes'
        });
    }
};
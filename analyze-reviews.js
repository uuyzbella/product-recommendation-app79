/**
 * Vercel API 路由：评价分析
 * 路径：/api/analyze-reviews
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
        const { productId, platform, limit = 20 } = req.body;

        if (!productId || !platform) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters: productId and platform',
                code: 'MISSING_PARAMS',
                requiredParams: ['productId', 'platform'],
                timestamp: new Date().toISOString()
            });
        }

        // 生成模拟评价数据
        const mockReviews = Array.from({ length: Math.min(limit, 10) }, (_, index) => ({
            id: `review_${Date.now()}_${index}`,
            userId: `user_${index + 1}`,
            userName: `用户${index + 1}`,
            rating: Math.floor(Math.random() * 2) + 4,
            content: [
                '商品质量不错，物流也很快',
                '性价比很高，推荐购买',
                '包装精美，产品符合描述',
                '客服态度很好，解答问题很及时',
                '用了几天，感觉还不错'
            ][index % 5],
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            verified: Math.random() > 0.2,
            helpful: Math.floor(Math.random() * 50),
            sentiment: ['positive', 'positive', 'positive', 'neutral', 'positive'][index % 5]
        }));

        const analysis = {
            authenticityScore: parseFloat((7.5 + Math.random() * 2).toFixed(1)),
            sentimentDistribution: {
                positive: 0.75,
                negative: 0.08,
                neutral: 0.17
            },
            fakeReviewPercentage: parseFloat((Math.random() * 15).toFixed(1)),
            trustworthiness: 'high',
            keyInsights: [
                '大部分用户对产品表示满意',
                '性价比得到广泛认可',
                '物流和包装质量较好',
                '客服服务质量优秀'
            ],
            pros: ['性价比高', '质量不错', '物流快', '服务好'],
            cons: ['包装可以改进', '颜色选择较少'],
            summary: '该商品整体评价良好，用户满意度较高，建议购买。'
        };

        return res.status(200).json({
            success: true,
            productId,
            platform,
            analysis,
            reviews: mockReviews,
            metadata: {
                totalReviewsAnalyzed: mockReviews.length,
                analysisTime: new Date().toISOString(),
                processingTimeMs: Math.floor(Math.random() * 800) + 200
            }
        });

    } catch (error) {
        console.error('Review analysis API error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal server error',
            timestamp: new Date().toISOString(),
            deployment: 'vercel-api-routes'
        });
    }
};
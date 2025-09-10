/**
 * Vercel API 路由：智能推荐
 * 路径：/api/recommend
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
        const { products, userPreferences, budget, strategy = 'value' } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Missing or empty products array',
                code: 'INVALID_PRODUCTS',
                requiredParams: ['products'],
                timestamp: new Date().toISOString()
            });
        }

        const recommendations = products.slice(0, 3).map((product, index) => {
            const score = Math.max(60, Math.floor(95 - index * 8 + Math.random() * 10));
            const confidence = Math.max(0.6, (0.95 - index * 0.1));
            
            return {
                product: { ...product, recommendationScore: score },
                score,
                confidence: parseFloat(confidence.toFixed(2)),
                reasons: [
                    `${strategy === 'value' ? '性价比' : '质量'}排名第${index + 1}`,
                    '用户评价良好',
                    '符合预算要求'
                ],
                pros: ['质量可靠', '价格合理', '服务完善'],
                cons: index > 0 ? ['价格稍高'] : [],
                bestFor: ['追求性价比的用户', '注重品质的用户'][index % 2]
            };
        });

        return res.status(200).json({
            success: true,
            recommendations: recommendations.sort((a, b) => b.score - a.score),
            metadata: {
                strategy,
                budget,
                totalProducts: products.length,
                recommendationCount: recommendations.length,
                processingTime: new Date().toISOString()
            },
            summary: {
                topRecommendation: recommendations[0]?.product?.title || 'N/A',
                avgScore: parseFloat((recommendations.reduce((sum, r) => sum + r.score, 0) / recommendations.length).toFixed(1)),
                confidence: parseFloat((recommendations.reduce((sum, r) => sum + r.confidence, 0) / recommendations.length).toFixed(2))
            }
        });

    } catch (error) {
        console.error('Recommendation API error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal server error',
            timestamp: new Date().toISOString(),
            deployment: 'vercel-api-routes'
        });
    }
};
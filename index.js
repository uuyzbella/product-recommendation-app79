/**
 * Vercel 主入口文件
 * 处理根路径访问
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

    if (req.method === 'GET') {
        return res.status(200).json({
            success: true,
            message: 'Product Review Agent API',
            version: '1.0.0',
            deployment: 'vercel',
            timestamp: new Date().toISOString(),
            endpoints: {
                health: '/api/health',
                search: '/api/search',
                analyzeReviews: '/api/analyze-reviews',
                recommend: '/api/recommend'
            },
            documentation: {
                frontend: 'https://ai-agent-crd7.bolt.host',
                difyWorkflow: 'app-gNvGNGxztpOW6bNKRWiAuzSm'
            }
        });
    }

    return res.status(405).json({
        success: false,
        error: 'Method not allowed',
        allowedMethods: ['GET', 'OPTIONS']
    });
};
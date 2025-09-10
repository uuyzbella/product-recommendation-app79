/**
 * Vercel API 路由：健康检查
 * 路径：/api/health
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
            status: 'healthy',
            region: 'china',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            deployment: 'vercel-api-routes',
            message: 'Product Review Agent API is running'
        });
    }

    return res.status(405).json({
        success: false,
        error: 'Method not allowed',
        allowedMethods: ['GET', 'OPTIONS']
    });
};
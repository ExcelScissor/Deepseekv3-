const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    // 从请求头获取token
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: '未提供认证令牌' });
    }

    try {
        // 验证token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: '无效的认证令牌' });
    }
}

module.exports = auth; 
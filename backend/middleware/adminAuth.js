const jwt = require('jsonwebtoken');

// 验证管理员权限
async function adminAuth(req, res, next) {
    try {
        // 从请求头获取token
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: '未提供认证令牌' });
        }

        // 验证token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // 检查用户是否有管理员权限
        req.db.get(
            'SELECT role FROM user_roles WHERE user_id = ? AND role = ?',
            [req.user.id, 'admin'],
            (err, role) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (!role) {
                    return res.status(403).json({ error: '需要管理员权限' });
                }
                next();
            }
        );
    } catch (error) {
        res.status(401).json({ error: '无效的认证令牌' });
    }
}

// 验证版主权限
async function moderatorAuth(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: '未提供认证令牌' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // 检查用户是否有管理员或版主权限
        req.db.get(
            'SELECT role FROM user_roles WHERE user_id = ? AND role IN (?, ?)',
            [req.user.id, 'admin', 'moderator'],
            (err, role) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (!role) {
                    return res.status(403).json({ error: '需要管理员或版主权限' });
                }
                next();
            }
        );
    } catch (error) {
        res.status(401).json({ error: '无效的认证令牌' });
    }
}

// 记录管理操作
async function logAdminAction(db, adminId, action, targetType, targetId, details) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO admin_logs (admin_id, action, target_type, target_id, details)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.run(sql, [adminId, action, targetType, targetId, details], function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
        });
    });
}

module.exports = {
    adminAuth,
    moderatorAuth,
    logAdminAction
}; 
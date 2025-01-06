const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const { adminAuth, moderatorAuth, logAdminAction } = require('./middleware/adminAuth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 数据库连接
const db = new sqlite3.Database(path.join(__dirname, '../database/excel_learning.db'), (err) => {
    if (err) {
        console.error('数据库连接失败:', err.message);
    } else {
        console.log('成功连接到数据库');
        // 初始化数据库表
        initDatabase();
    }
});

// 初始化数据库表
function initDatabase() {
    // 创建用户表
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Excel公式表
    db.run(`CREATE TABLE IF NOT EXISTS formulas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        syntax TEXT NOT NULL,
        example TEXT NOT NULL
    )`);

    // 教程表
    db.run(`CREATE TABLE IF NOT EXISTS tutorials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        level TEXT NOT NULL,
        category TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 用户收藏表
    db.run(`CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        item_type TEXT NOT NULL,
        item_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    // 评论表
    db.run(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        item_type TEXT NOT NULL,
        item_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        parent_id INTEGER DEFAULT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (parent_id) REFERENCES comments (id)
    )`);

    // 反馈表
    db.run(`CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        admin_reply TEXT,
        admin_reply_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    // 评分表
    db.run(`CREATE TABLE IF NOT EXISTS ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        item_type TEXT NOT NULL,
        item_id INTEGER NOT NULL,
        score INTEGER NOT NULL CHECK(score >= 1 AND score <= 5),
        review TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        UNIQUE(user_id, item_type, item_id)
    )`);

    // 评分统计表（用于缓存计算结果）
    db.run(`CREATE TABLE IF NOT EXISTS rating_stats (
        item_type TEXT NOT NULL,
        item_id INTEGER NOT NULL,
        avg_score REAL NOT NULL DEFAULT 0,
        total_ratings INTEGER NOT NULL DEFAULT 0,
        rating_distribution TEXT NOT NULL DEFAULT '{"1":0,"2":0,"3":0,"4":0,"5":0}',
        last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (item_type, item_id)
    )`);

    // 用户角色表
    db.run(`CREATE TABLE IF NOT EXISTS user_roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('admin', 'moderator', 'user')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        UNIQUE(user_id, role)
    )`);

    // 操作日志表
    db.run(`CREATE TABLE IF NOT EXISTS admin_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        admin_id INTEGER NOT NULL,
        action TEXT NOT NULL,
        target_type TEXT NOT NULL,
        target_id INTEGER,
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (admin_id) REFERENCES users (id)
    )`);
}

// 用户认证路由
// 1. 注册
app.post('/api/register', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: '所有字段都是必填的' });
    }

    // 检查用户名是否已存在
    db.get('SELECT id FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            console.error('数据库查询错误:', err);
            return res.status(500).json({ message: '服务器错误' });
        }

        if (user) {
            return res.status(400).json({ message: '用户名已存在' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
            
            db.run(sql, [username, hashedPassword, email], function(err) {
                if (err) {
                    console.error('创建用户错误:', err);
                    return res.status(500).json({ message: '创建用户失败' });
                }

                const token = jwt.sign(
                    { user_id: this.lastID, username },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );

                res.status(201).json({
                    message: '注册成功',
                    token,
                    user: {
                        id: this.lastID,
                        username,
                        email
                    }
                });
            });
        } catch (err) {
            console.error('密码加密错误:', err);
            res.status(500).json({ message: '服务器错误' });
        }
    });
});

// 2. 登录
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: '用户名和密码不能为空' });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], async (err, user) => {
        if (err) {
            console.error('数据库查询错误:', err);
            return res.status(500).json({ message: '服务器错误' });
        }

        if (!user) {
            return res.status(401).json({ message: '用户名或密码错误' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: '用户名或密码错误' });
        }

        const token = jwt.sign(
            { user_id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    });
});

// 3. 获取当前用户信息
app.get('/api/me', auth, (req, res) => {
    db.get('SELECT id, username, email FROM users WHERE id = ?', [req.user.id], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(404).json({ error: '用户不存在' });
        }
        res.json(user);
    });
});

// 4. 修改密码
app.put('/api/change-password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // 验证输入
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: '当前密码和新密码都是必填的' });
        }

        // 获取用户信息
        db.get('SELECT * FROM users WHERE id = ?', [req.user.id], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // 验证当前密码
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: '当前密码错误' });
            }

            // 加密新密码
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // 更新密码
            db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.user.id], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: '密码修改成功' });
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 路由
// 1. 搜索路由
app.get('/api/search', (req, res) => {
    const query = req.query.q;
    const sql = `
        SELECT 'formula' as type, id, name as title, description
        FROM formulas 
        WHERE name LIKE ? OR description LIKE ?
        UNION
        SELECT 'tutorial' as type, id, title, content as description
        FROM tutorials
        WHERE title LIKE ? OR content LIKE ?
        LIMIT 20
    `;
    const searchPattern = `%${query}%`;
    
    db.all(sql, [searchPattern, searchPattern, searchPattern, searchPattern], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// 2. 公式路由
app.get('/api/formulas', (req, res) => {
    const sql = 'SELECT * FROM formulas ORDER BY name';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// 3. 教程路由
app.get('/api/tutorials', (req, res) => {
    const { level, category } = req.query;
    let sql = 'SELECT * FROM tutorials';
    const params = [];

    if (level && category) {
        sql += ' WHERE level = ? AND category = ?';
        params.push(level, category);
    } else if (level) {
        sql += ' WHERE level = ?';
        params.push(level);
    } else if (category) {
        sql += ' WHERE category = ?';
        params.push(category);
    }

    sql += ' ORDER BY created_at DESC';

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// 收藏功能路由
// 1. 添加收藏
app.post('/api/favorites', auth, (req, res) => {
    const { item_type, item_id } = req.body;
    const user_id = req.user.id;

    // 验证输入
    if (!item_type || !item_id) {
        return res.status(400).json({ error: '类型和ID都是必填的' });
    }

    // 验证item_type是否有效
    if (!['formula', 'tutorial'].includes(item_type)) {
        return res.status(400).json({ error: '无效的收藏类型' });
    }

    // 检查项目是否存在
    const checkTable = item_type === 'formula' ? 'formulas' : 'tutorials';
    db.get(`SELECT id FROM ${checkTable} WHERE id = ?`, [item_id], (err, item) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!item) {
            return res.status(404).json({ error: '要收藏的项目不存在' });
        }

        // 检查是否已经收藏
        db.get(
            'SELECT id FROM favorites WHERE user_id = ? AND item_type = ? AND item_id = ?',
            [user_id, item_type, item_id],
            (err, favorite) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (favorite) {
                    return res.status(400).json({ error: '已经收藏过了' });
                }

                // 添加收藏
                const sql = 'INSERT INTO favorites (user_id, item_type, item_id) VALUES (?, ?, ?)';
                db.run(sql, [user_id, item_type, item_id], function(err) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.json({
                        id: this.lastID,
                        message: '收藏成功'
                    });
                });
            }
        );
    });
});

// 2. 获取用户的收藏列表
app.get('/api/favorites', auth, (req, res) => {
    const sql = `
        SELECT f.id as favorite_id, f.item_type, f.item_id, f.created_at,
            CASE 
                WHEN f.item_type = 'formula' THEN fm.name
                WHEN f.item_type = 'tutorial' THEN t.title
            END as title,
            CASE 
                WHEN f.item_type = 'formula' THEN fm.description
                WHEN f.item_type = 'tutorial' THEN t.content
            END as description
        FROM favorites f
        LEFT JOIN formulas fm ON f.item_type = 'formula' AND f.item_id = fm.id
        LEFT JOIN tutorials t ON f.item_type = 'tutorial' AND f.item_id = t.id
        WHERE f.user_id = ?
        ORDER BY f.created_at DESC
    `;

    db.all(sql, [req.user.id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 3. 删除收藏
app.delete('/api/favorites/:id', auth, (req, res) => {
    const favoriteId = req.params.id;

    // 验证收藏是否属于当前用户
    db.get(
        'SELECT id FROM favorites WHERE id = ? AND user_id = ?',
        [favoriteId, req.user.id],
        (err, favorite) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!favorite) {
                return res.status(404).json({ error: '收藏不存在或无权限删除' });
            }

            // 删除收藏
            db.run('DELETE FROM favorites WHERE id = ?', [favoriteId], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: '收藏已删除' });
            });
        }
    );
});

// 4. 检查是否已收藏
app.get('/api/favorites/check', auth, (req, res) => {
    const { item_type, item_id } = req.query;

    if (!item_type || !item_id) {
        return res.status(400).json({ error: '类型和ID都是必填的' });
    }

    db.get(
        'SELECT id FROM favorites WHERE user_id = ? AND item_type = ? AND item_id = ?',
        [req.user.id, item_type, item_id],
        (err, favorite) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({
                isFavorited: !!favorite,
                favoriteId: favorite ? favorite.id : null
            });
        }
    );
});

// 评论功能路由
// 1. 添加评论
app.post('/api/comments', auth, (req, res) => {
    const { item_type, item_id, content, parent_id } = req.body;
    const user_id = req.user.id;

    // 验证输入
    if (!item_type || !item_id || !content) {
        return res.status(400).json({ error: '类型、ID和内容都是必填的' });
    }

    // 验证item_type是否有效
    if (!['formula', 'tutorial'].includes(item_type)) {
        return res.status(400).json({ error: '无效的评论类型' });
    }

    // 检查项目是否存在
    const checkTable = item_type === 'formula' ? 'formulas' : 'tutorials';
    db.get(`SELECT id FROM ${checkTable} WHERE id = ?`, [item_id], (err, item) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!item) {
            return res.status(404).json({ error: '要评论的项目不存在' });
        }

        // 如果有父评论，检查父评论是否存在
        if (parent_id) {
            db.get('SELECT id FROM comments WHERE id = ?', [parent_id], (err, parentComment) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (!parentComment) {
                    return res.status(404).json({ error: '父评论不存在' });
                }
                insertComment();
            });
        } else {
            insertComment();
        }

        function insertComment() {
            const sql = `
                INSERT INTO comments (user_id, item_type, item_id, content, parent_id)
                VALUES (?, ?, ?, ?, ?)
            `;
            db.run(sql, [user_id, item_type, item_id, content, parent_id || null], function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                
                // 返回新创建的评论信息
                db.get(`
                    SELECT c.*, u.username
                    FROM comments c
                    JOIN users u ON c.user_id = u.id
                    WHERE c.id = ?
                `, [this.lastID], (err, comment) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.json(comment);
                });
            });
        }
    });
});

// 2. 获取评论列表
app.get('/api/comments', (req, res) => {
    const { item_type, item_id } = req.query;

    if (!item_type || !item_id) {
        return res.status(400).json({ error: '类型和ID都是必填的' });
    }

    const sql = `
        WITH RECURSIVE comment_tree AS (
            -- 获取顶层评论
            SELECT 
                c.id,
                c.user_id,
                c.content,
                c.created_at,
                c.updated_at,
                c.parent_id,
                u.username,
                0 as level,
                c.id as thread_id,
                CAST(printf('%012d', c.id) AS TEXT) as path
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.item_type = ? 
            AND c.item_id = ?
            AND c.parent_id IS NULL

            UNION ALL

            -- 获取回复
            SELECT 
                c.id,
                c.user_id,
                c.content,
                c.created_at,
                c.updated_at,
                c.parent_id,
                u.username,
                ct.level + 1,
                ct.thread_id,
                ct.path || '.' || printf('%012d', c.id)
            FROM comments c
            JOIN comment_tree ct ON c.parent_id = ct.id
            JOIN users u ON c.user_id = u.id
        )
        SELECT *
        FROM comment_tree
        ORDER BY path;
    `;

    db.all(sql, [item_type, item_id], (err, comments) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(comments);
    });
});

// 3. 更新评论
app.put('/api/comments/:id', auth, (req, res) => {
    const commentId = req.params.id;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: '内容是必填的' });
    }

    // 验证评论是否属于当前用户
    db.get(
        'SELECT id FROM comments WHERE id = ? AND user_id = ?',
        [commentId, req.user.id],
        (err, comment) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!comment) {
                return res.status(404).json({ error: '评论不存在或无权限修改' });
            }

            // 更新评论
            const sql = `
                UPDATE comments 
                SET content = ?, updated_at = CURRENT_TIMESTAMP 
                WHERE id = ?
            `;
            db.run(sql, [content, commentId], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                // 返回更新后的评论
                db.get(`
                    SELECT c.*, u.username
                    FROM comments c
                    JOIN users u ON c.user_id = u.id
                    WHERE c.id = ?
                `, [commentId], (err, updatedComment) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.json(updatedComment);
                });
            });
        }
    );
});

// 4. 删除评论
app.delete('/api/comments/:id', auth, (req, res) => {
    const commentId = req.params.id;

    // 验证评论是否属于当前用户
    db.get(
        'SELECT id FROM comments WHERE id = ? AND user_id = ?',
        [commentId, req.user.id],
        (err, comment) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!comment) {
                return res.status(404).json({ error: '评论不存在或无权限删除' });
            }

            // 删除评论及其所有回复
            db.run('DELETE FROM comments WHERE id = ? OR parent_id = ?', [commentId, commentId], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: '评论已删除' });
            });
        }
    );
});

// 反馈功能路由
// 1. 提交反馈
app.post('/api/feedback', auth, (req, res) => {
    const { type, title, content } = req.body;
    const user_id = req.user.id;

    // 验证输入
    if (!type || !title || !content) {
        return res.status(400).json({ error: '类型、标题和内容都是必填的' });
    }

    // 验证反馈类型
    const validTypes = ['bug', 'feature', 'question', 'suggestion'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({ error: '无效的反馈类型' });
    }

    const sql = `
        INSERT INTO feedback (user_id, type, title, content)
        VALUES (?, ?, ?, ?)
    `;
    db.run(sql, [user_id, type, title, content], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // 返回新创建的反馈信息
        db.get(`
            SELECT f.*, u.username
            FROM feedback f
            JOIN users u ON f.user_id = u.id
            WHERE f.id = ?
        `, [this.lastID], (err, feedback) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(feedback);
        });
    });
});

// 2. 获取用户的反馈列表
app.get('/api/feedback', auth, (req, res) => {
    const sql = `
        SELECT f.*, u.username
        FROM feedback f
        JOIN users u ON f.user_id = u.id
        WHERE f.user_id = ?
        ORDER BY f.created_at DESC
    `;

    db.all(sql, [req.user.id], (err, feedbacks) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(feedbacks);
    });
});

// 3. 获取反馈详情
app.get('/api/feedback/:id', auth, (req, res) => {
    const feedbackId = req.params.id;

    db.get(`
        SELECT f.*, u.username
        FROM feedback f
        JOIN users u ON f.user_id = u.id
        WHERE f.id = ? AND f.user_id = ?
    `, [feedbackId, req.user.id], (err, feedback) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!feedback) {
            return res.status(404).json({ error: '反馈不存在或无权限查看' });
        }
        res.json(feedback);
    });
});

// 4. 更新反馈
app.put('/api/feedback/:id', auth, (req, res) => {
    const feedbackId = req.params.id;
    const { title, content } = req.body;

    // 验证输入
    if (!title || !content) {
        return res.status(400).json({ error: '标题和内容都是必填的' });
    }

    // 验证反馈是否属于当前用户
    db.get(
        'SELECT id FROM feedback WHERE id = ? AND user_id = ?',
        [feedbackId, req.user.id],
        (err, feedback) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!feedback) {
                return res.status(404).json({ error: '反馈不存在或无权限修改' });
            }

            // 更新反馈
            const sql = `
                UPDATE feedback 
                SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP 
                WHERE id = ?
            `;
            db.run(sql, [title, content, feedbackId], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                // 返回更新后的反馈
                db.get(`
                    SELECT f.*, u.username
                    FROM feedback f
                    JOIN users u ON f.user_id = u.id
                    WHERE f.id = ?
                `, [feedbackId], (err, updatedFeedback) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.json(updatedFeedback);
                });
            });
        }
    );
});

// 5. 删除反馈
app.delete('/api/feedback/:id', auth, (req, res) => {
    const feedbackId = req.params.id;

    // 验证反馈是否属于当前用户
    db.get(
        'SELECT id FROM feedback WHERE id = ? AND user_id = ?',
        [feedbackId, req.user.id],
        (err, feedback) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!feedback) {
                return res.status(404).json({ error: '反馈不存在或无权限删除' });
            }

            // 删除反馈
            db.run('DELETE FROM feedback WHERE id = ?', [feedbackId], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: '反馈已删除' });
            });
        }
    );
});

// 6. 管理员回复反馈（需要管理员权限）
app.post('/api/feedback/:id/reply', auth, (req, res) => {
    const feedbackId = req.params.id;
    const { reply } = req.body;

    // TODO: 添加管理员权限验证
    // 这里暂时允许所有已登录用户回复，实际应用中需要验证管理员权限

    if (!reply) {
        return res.status(400).json({ error: '回复内容是必填的' });
    }

    const sql = `
        UPDATE feedback 
        SET admin_reply = ?, 
            admin_reply_at = CURRENT_TIMESTAMP,
            status = 'replied'
        WHERE id = ?
    `;
    
    db.run(sql, [reply, feedbackId], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // 返回更新后的反馈
        db.get(`
            SELECT f.*, u.username
            FROM feedback f
            JOIN users u ON f.user_id = u.id
            WHERE f.id = ?
        `, [feedbackId], (err, updatedFeedback) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!updatedFeedback) {
                return res.status(404).json({ error: '反馈不存在' });
            }
            res.json(updatedFeedback);
        });
    });
});

// 评分功能路由
// 1. 添加或更新评分
app.post('/api/ratings', auth, async (req, res) => {
    const { item_type, item_id, score, review } = req.body;
    const user_id = req.user.id;

    // 验证输入
    if (!item_type || !item_id || !score) {
        return res.status(400).json({ error: '类型、ID和评分都是必填的' });
    }

    // 验证评分范围
    if (score < 1 || score > 5) {
        return res.status(400).json({ error: '评分必须在1-5之间' });
    }

    // 验证item_type是否有效
    if (!['formula', 'tutorial'].includes(item_type)) {
        return res.status(400).json({ error: '无效的评分类型' });
    }

    // 检查项目是否存在
    const checkTable = item_type === 'formula' ? 'formulas' : 'tutorials';
    db.get(`SELECT id FROM ${checkTable} WHERE id = ?`, [item_id], (err, item) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!item) {
            return res.status(404).json({ error: '要评分的项目不存在' });
        }

        // 使用事务确保数据一致性
        db.serialize(() => {
            db.run('BEGIN TRANSACTION');

            // 尝试插入新评分
            const insertSql = `
                INSERT INTO ratings (user_id, item_type, item_id, score, review)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(user_id, item_type, item_id) 
                DO UPDATE SET score = ?, review = ?, updated_at = CURRENT_TIMESTAMP
            `;
            db.run(insertSql, [user_id, item_type, item_id, score, review, score, review], function(err) {
                if (err) {
                    db.run('ROLLBACK');
                    return res.status(500).json({ error: err.message });
                }

                // 更新统计信息
                updateRatingStats(item_type, item_id, (err) => {
                    if (err) {
                        db.run('ROLLBACK');
                        return res.status(500).json({ error: err.message });
                    }

                    db.run('COMMIT');
                    res.json({
                        message: '评分已更新',
                        rating: {
                            id: this.lastID,
                            score,
                            review
                        }
                    });
                });
            });
        });
    });
});

// 2. 获取项目的评分统计
app.get('/api/ratings/stats/:item_type/:item_id', (req, res) => {
    const { item_type, item_id } = req.params;

    // 验证item_type是否有效
    if (!['formula', 'tutorial'].includes(item_type)) {
        return res.status(400).json({ error: '无效的评分类型' });
    }

    db.get(
        'SELECT * FROM rating_stats WHERE item_type = ? AND item_id = ?',
        [item_type, item_id],
        (err, stats) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!stats) {
                return res.json({
                    avg_score: 0,
                    total_ratings: 0,
                    rating_distribution: {"1":0,"2":0,"3":0,"4":0,"5":0}
                });
            }
            stats.rating_distribution = JSON.parse(stats.rating_distribution);
            res.json(stats);
        }
    );
});

// 3. 获取用户对特定项目的评分
app.get('/api/ratings/user/:item_type/:item_id', auth, (req, res) => {
    const { item_type, item_id } = req.params;
    const user_id = req.user.id;

    db.get(
        'SELECT * FROM ratings WHERE user_id = ? AND item_type = ? AND item_id = ?',
        [user_id, item_type, item_id],
        (err, rating) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rating || null);
        }
    );
});

// 4. 获取项目的所有评分和评价
app.get('/api/ratings/:item_type/:item_id', (req, res) => {
    const { item_type, item_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const sql = `
        SELECT r.*, u.username
        FROM ratings r
        JOIN users u ON r.user_id = u.id
        WHERE r.item_type = ? AND r.item_id = ?
        ORDER BY r.created_at DESC
        LIMIT ? OFFSET ?
    `;

    db.all(sql, [item_type, item_id, limit, offset], (err, ratings) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(ratings);
    });
});

// 辅助函数：更新评分统计
function updateRatingStats(item_type, item_id, callback) {
    const sql = `
        WITH rating_counts AS (
            SELECT 
                score,
                COUNT(*) as count
            FROM ratings
            WHERE item_type = ? AND item_id = ?
            GROUP BY score
        )
        SELECT 
            AVG(score) as avg_score,
            COUNT(*) as total_ratings,
            JSON_OBJECT(
                '1', COALESCE(SUM(CASE WHEN score = 1 THEN count END), 0),
                '2', COALESCE(SUM(CASE WHEN score = 2 THEN count END), 0),
                '3', COALESCE(SUM(CASE WHEN score = 3 THEN count END), 0),
                '4', COALESCE(SUM(CASE WHEN score = 4 THEN count END), 0),
                '5', COALESCE(SUM(CASE WHEN score = 5 THEN count END), 0)
            ) as rating_distribution
        FROM ratings
        WHERE item_type = ? AND item_id = ?
    `;

    db.get(sql, [item_type, item_id, item_type, item_id], (err, result) => {
        if (err) {
            return callback(err);
        }

        const updateSql = `
            INSERT INTO rating_stats (item_type, item_id, avg_score, total_ratings, rating_distribution, last_updated)
            VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(item_type, item_id) 
            DO UPDATE SET 
                avg_score = ?,
                total_ratings = ?,
                rating_distribution = ?,
                last_updated = CURRENT_TIMESTAMP
        `;

        db.run(
            updateSql,
            [
                item_type, item_id,
                result.avg_score || 0,
                result.total_ratings || 0,
                result.rating_distribution || '{"1":0,"2":0,"3":0,"4":0,"5":0}',
                result.avg_score || 0,
                result.total_ratings || 0,
                result.rating_distribution || '{"1":0,"2":0,"3":0,"4":0,"5":0}'
            ],
            callback
        );
    });
}

// 管理员路由
// 1. 获取所有用户列表
app.get('/api/admin/users', adminAuth, (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const sql = `
        SELECT u.*, GROUP_CONCAT(ur.role) as roles
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        GROUP BY u.id
        ORDER BY u.created_at DESC
        LIMIT ? OFFSET ?
    `;

    db.all(sql, [limit, offset], (err, users) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(users);
    });
});

// 2. 修改用户角色
app.put('/api/admin/users/:id/role', adminAuth, async (req, res) => {
    const userId = req.params.id;
    const { roles } = req.body;

    if (!Array.isArray(roles)) {
        return res.status(400).json({ error: '角色必须是数组' });
    }

    const validRoles = ['admin', 'moderator', 'user'];
    if (!roles.every(role => validRoles.includes(role))) {
        return res.status(400).json({ error: '包含无效的角色' });
    }

    try {
        await new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');

                // 删除现有角色
                db.run('DELETE FROM user_roles WHERE user_id = ?', [userId], (err) => {
                    if (err) {
                        db.run('ROLLBACK');
                        reject(err);
                        return;
                    }

                    // 添加新角色
                    const stmt = db.prepare('INSERT INTO user_roles (user_id, role) VALUES (?, ?)');
                    roles.forEach(role => {
                        stmt.run([userId, role], (err) => {
                            if (err) {
                                db.run('ROLLBACK');
                                reject(err);
                                return;
                            }
                        });
                    });
                    stmt.finalize();

                    db.run('COMMIT', (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            });
        });

        // 记录操作日志
        await logAdminAction(
            db,
            req.user.id,
            'update_user_roles',
            'user',
            userId,
            JSON.stringify(roles)
        );

        res.json({ message: '用户角色已更新' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. 获取管理日志
app.get('/api/admin/logs', adminAuth, (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const sql = `
        SELECT l.*, u.username as admin_username
        FROM admin_logs l
        JOIN users u ON l.admin_id = u.id
        ORDER BY l.created_at DESC
        LIMIT ? OFFSET ?
    `;

    db.all(sql, [limit, offset], (err, logs) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(logs);
    });
});

// 4. 内容管理
// 4.1 删除内容
app.delete('/api/admin/content/:type/:id', moderatorAuth, async (req, res) => {
    const { type, id } = req.params;
    const { reason } = req.body;

    // 验证内容类型
    const validTypes = ['tutorial', 'formula', 'comment', 'feedback'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({ error: '无效的内容类型' });
    }

    try {
        // 删除内容
        const table = type + 's'; // tutorials, formulas, comments, feedback
        await new Promise((resolve, reject) => {
            db.run(`DELETE FROM ${table} WHERE id = ?`, [id], function(err) {
                if (err) reject(err);
                else {
                    if (this.changes === 0) {
                        reject(new Error('内容不存在'));
                    } else {
                        resolve();
                    }
                }
            });
        });

        // 记录操作日志
        await logAdminAction(
            db,
            req.user.id,
            'delete_content',
            type,
            id,
            reason || '管理员删除'
        );

        res.json({ message: '内容已删除' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4.2 获取待审核内容
app.get('/api/admin/pending-content', moderatorAuth, (req, res) => {
    const sql = `
        SELECT 'feedback' as type, f.*, u.username
        FROM feedback f
        JOIN users u ON f.user_id = u.id
        WHERE f.status = 'pending'
        ORDER BY f.created_at DESC
    `;

    db.all(sql, [], (err, content) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(content);
    });
});

// 4.3 审核内容
app.put('/api/admin/content/:type/:id/review', moderatorAuth, async (req, res) => {
    const { type, id } = req.params;
    const { action, reason } = req.body;

    if (!['approve', 'reject'].includes(action)) {
        return res.status(400).json({ error: '无效的审核操作' });
    }

    try {
        // 更新内容状态
        const status = action === 'approve' ? 'approved' : 'rejected';
        await new Promise((resolve, reject) => {
            db.run(
                'UPDATE feedback SET status = ?, admin_reply = ? WHERE id = ?',
                [status, reason, id],
                function(err) {
                    if (err) reject(err);
                    else {
                        if (this.changes === 0) {
                            reject(new Error('内容不存在'));
                        } else {
                            resolve();
                        }
                    }
                }
            );
        });

        // 记录操作日志
        await logAdminAction(
            db,
            req.user.id,
            `${action}_content`,
            type,
            id,
            reason
        );

        res.json({ message: '审核完成' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. 统计信息
app.get('/api/admin/stats', adminAuth, (req, res) => {
    const stats = {};
    let completed = 0;
    const total = 5;

    // 用户统计
    db.get('SELECT COUNT(*) as count FROM users', [], (err, result) => {
        if (!err) stats.totalUsers = result.count;
        if (++completed === total) sendResponse();
    });

    // 教程统计
    db.get('SELECT COUNT(*) as count FROM tutorials', [], (err, result) => {
        if (!err) stats.totalTutorials = result.count;
        if (++completed === total) sendResponse();
    });

    // 公式统计
    db.get('SELECT COUNT(*) as count FROM formulas', [], (err, result) => {
        if (!err) stats.totalFormulas = result.count;
        if (++completed === total) sendResponse();
    });

    // 评论统计
    db.get('SELECT COUNT(*) as count FROM comments', [], (err, result) => {
        if (!err) stats.totalComments = result.count;
        if (++completed === total) sendResponse();
    });

    // 待处理反馈统计
    db.get('SELECT COUNT(*) as count FROM feedback WHERE status = ?', ['pending'], (err, result) => {
        if (!err) stats.pendingFeedback = result.count;
        if (++completed === total) sendResponse();
    });

    function sendResponse() {
        res.json(stats);
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 
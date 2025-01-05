// API基础URL
const API_BASE_URL = 'http://localhost:3000/api';

// 创建axios实例
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000
});

// 添加请求拦截器
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            // 未授权，跳转到登录页
            localStorage.removeItem('token');
            window.location.href = '/login.html';
        }
        return Promise.reject(error);
    }
);

// Vue应用
const app = Vue.createApp({
    data() {
        return {
            currentView: 'dashboard',
            contentTab: 'tutorials',
            currentPage: 1,
            totalPages: 1,
            stats: {},
            users: [],
            contentList: [],
            feedbackList: [],
            logs: [],
            // 用户编辑相关
            editingUser: {
                id: null,
                username: '',
                email: '',
                roles: []
            },
            editError: '',
            isSaving: false,
            availableRoles: [
                { value: 'admin', label: '管理员' },
                { value: 'moderator', label: '版主' },
                { value: 'user', label: '普通用户' }
            ],
            userModal: null,
            // 用户筛选
            userFilters: {
                search: '',
                role: '',
                status: '',
                sortBy: 'created_at',
                order: 'desc',
                registerDateStart: '',
                registerDateEnd: '',
                loginCountMin: '',
                loginCountMax: ''
            },
            // 内容筛选
            contentFilters: {
                search: '',
                type: '',
                sortBy: 'created_at',
                order: 'desc'
            },
            // 防抖定时器
            searchTimeout: null,
            contentSearchTimeout: null,
            // 批量操作相关
            selectedUsers: [],
            selectedContent: [],
            selectAllUsers: false,
            selectAllContent: false,
            // 图表实例
            charts: {
                userGrowth: null,
                contentDistribution: null,
                feedbackType: null,
                activeUsers: null
            },
            // 加载状态
            loading: {
                stats: false,
                users: false,
                content: false,
                feedback: false,
                logs: false,
                charts: false
            },
            // 数据缓存
            cache: {
                stats: null,
                users: {},
                content: {},
                feedback: null,
                logs: null,
                charts: null
            },
            // 缓存过期时间（毫秒）
            cacheExpiration: 5 * 60 * 1000, // 5分钟
            // 最后加载时间
            lastLoadTime: {
                stats: 0,
                users: 0,
                content: 0,
                feedback: 0,
                logs: 0,
                charts: 0
            },
            // 显示高级筛选
            showAdvancedFilters: false
        };
    },

    methods: {
        // 格式化日期
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleString('zh-CN');
        },

        // 获取角色徽章样式
        getRoleBadgeClass(roles) {
            if (roles && roles.includes('admin')) return 'badge-admin';
            if (roles && roles.includes('moderator')) return 'badge-moderator';
            return 'badge-user';
        },

        // 获取反馈类型徽章样式
        getFeedbackTypeBadgeClass(type) {
            return `badge-${type}`;
        },

        // 获取反馈状态徽章样式
        getFeedbackStatusBadgeClass(status) {
            return `badge-${status}`;
        },

        // 检查缓存是否有效
        isCacheValid(type) {
            const lastLoad = this.lastLoadTime[type];
            return lastLoad && (Date.now() - lastLoad) < this.cacheExpiration;
        },

        // 更新加载统计数据方法
        async loadStats() {
            if (this.loading.stats) return;
            
            // 检查缓存
            if (this.isCacheValid('stats') && this.cache.stats) {
                this.stats = this.cache.stats;
                return;
            }

            this.loading.stats = true;
            try {
                const response = await api.get('/admin/stats');
                this.stats = response.data;
                this.cache.stats = response.data;
                this.lastLoadTime.stats = Date.now();

                // 初始化并更新图表
                if (this.currentView === 'dashboard') {
                    if (!this.charts.userGrowth) {
                        this.initCharts();
                    }
                    this.updateCharts();
                }
            } catch (error) {
                console.error('加载统计数据失败:', error);
            } finally {
                this.loading.stats = false;
            }
        },

        // 更新加载用户列表方法
        async loadUsers(page = 1) {
            if (this.loading.users) return;

            const cacheKey = `${page}-${JSON.stringify(this.userFilters)}`;
            if (this.isCacheValid('users') && this.cache.users[cacheKey]) {
                this.users = this.cache.users[cacheKey].data;
                this.totalPages = this.cache.users[cacheKey].totalPages;
                return;
            }

            this.loading.users = true;
            try {
                const response = await api.get('/admin/users', {
                    params: {
                        page,
                        limit: 10,
                        search: this.userFilters.search,
                        role: this.userFilters.role,
                        status: this.userFilters.status,
                        sortBy: this.userFilters.sortBy,
                        order: this.userFilters.order,
                        registerDateStart: this.userFilters.registerDateStart,
                        registerDateEnd: this.userFilters.registerDateEnd,
                        loginCountMin: this.userFilters.loginCountMin,
                        loginCountMax: this.userFilters.loginCountMax
                    }
                });
                this.users = response.data;
                this.totalPages = Math.ceil(response.headers['x-total-count'] / 10);
                
                // 缓存数据
                this.cache.users[cacheKey] = {
                    data: response.data,
                    totalPages: this.totalPages
                };
                this.lastLoadTime.users = Date.now();
            } catch (error) {
                console.error('加载用户列表失败:', error);
            } finally {
                this.loading.users = false;
            }
        },

        // 加载内容列表
        async loadContent() {
            if (this.loading.content) return;

            const cacheKey = `${this.contentTab}-${JSON.stringify(this.contentFilters)}`;
            if (this.isCacheValid('content') && this.cache.content[cacheKey]) {
                this.contentList = this.cache.content[cacheKey];
                return;
            }

            this.loading.content = true;
            try {
                const response = await api.get(`/admin/${this.contentTab}`, {
                    params: {
                        search: this.contentFilters.search,
                        type: this.contentFilters.type,
                        sortBy: this.contentFilters.sortBy,
                        order: this.contentFilters.order
                    }
                });
                this.contentList = response.data;
                
                // 缓存数据
                this.cache.content[cacheKey] = response.data;
                this.lastLoadTime.content = Date.now();
            } catch (error) {
                console.error('加载内容列表失败:', error);
            } finally {
                this.loading.content = false;
            }
        },

        // 加载反馈列表
        async loadFeedback() {
            try {
                const response = await api.get('/admin/pending-content');
                this.feedbackList = response.data;
            } catch (error) {
                console.error('加载反馈列表失败:', error);
            }
        },

        // 加载操作日志
        async loadLogs() {
            try {
                const response = await api.get('/admin/logs');
                this.logs = response.data;
            } catch (error) {
                console.error('加载操作日志失败:', error);
            }
        },

        // 编辑用户
        async editUser(user) {
            this.editingUser = {
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.roles ? user.roles.split(',') : ['user']
            };
            this.editError = '';
            this.userModal.show();
        },

        // 保存用户
        async saveUser() {
            if (this.isSaving) return;
            this.isSaving = true;
            this.editError = '';

            try {
                await api.put(`/admin/users/${this.editingUser.id}/role`, {
                    roles: this.editingUser.roles
                });

                // 更新用户列表中的用户角色
                const userIndex = this.users.findIndex(u => u.id === this.editingUser.id);
                if (userIndex !== -1) {
                    this.users[userIndex].roles = this.editingUser.roles.join(',');
                }

                this.userModal.hide();
                // 显示成功提示
                alert('用户角色更新成功');
            } catch (error) {
                this.editError = error.response?.data?.error || '保存失败，请重试';
            } finally {
                this.isSaving = false;
            }
        },

        // 删除内容
        async deleteContent(item) {
            if (!confirm('确定要删除这个内容吗？')) return;

            try {
                await api.delete(`/admin/content/${this.contentTab}/${item.id}`);
                this.loadContent();
            } catch (error) {
                console.error('删除内容失败:', error);
            }
        },

        // 查看反馈
        async viewFeedback(feedback) {
            // TODO: 实现查看反馈对话框
            console.log('查看反馈:', feedback);
        },

        // 切换页面
        async changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            this.loadUsers(page);
        },

        // 退出登录
        logout() {
            localStorage.removeItem('token');
            window.location.href = '/login.html';
        },

        // 检查权限
        checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login.html';
            }
        },

        // 用户搜索防抖
        debounceSearch() {
            if (this.searchTimeout) clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.loadUsers(1);
            }, 300);
        },

        // 内容搜索防抖
        debounceContentSearch() {
            if (this.contentSearchTimeout) clearTimeout(this.contentSearchTimeout);
            this.contentSearchTimeout = setTimeout(() => {
                this.loadContent();
            }, 300);
        },

        // 导出用户数据
        async exportUsers() {
            try {
                // 获取筛选后的用户数据
                const response = await api.get('/admin/users/export', {
                    params: {
                        search: this.userFilters.search,
                        role: this.userFilters.role,
                        sortBy: this.userFilters.sortBy,
                        order: this.userFilters.order
                    },
                    responseType: 'blob'
                });

                // 创建下载链接
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `用户数据_${new Date().toLocaleDateString()}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('导出用户数据失败:', error);
                alert('导出失败，请重试');
            }
        },

        // 导出内容数据
        async exportContent() {
            try {
                // 获取筛选后的内容数据
                const response = await api.get(`/admin/${this.contentTab}/export`, {
                    params: {
                        search: this.contentFilters.search,
                        type: this.contentFilters.type,
                        sortBy: this.contentFilters.sortBy,
                        order: this.contentFilters.order
                    },
                    responseType: 'blob'
                });

                // 创建下载链接
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                const fileName = this.contentTab === 'tutorials' ? '教程数据' : '公式数据';
                link.setAttribute('download', `${fileName}_${new Date().toLocaleDateString()}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('导出内容数据失败:', error);
                alert('导出失败，请重试');
            }
        },

        // 切换全选用户
        toggleAllUsers() {
            if (this.selectAllUsers) {
                this.selectedUsers = this.users.map(user => user.id);
            } else {
                this.selectedUsers = [];
            }
        },

        // 切换全选内容
        toggleAllContent() {
            if (this.selectAllContent) {
                this.selectedContent = this.contentList.map(item => item.id);
            } else {
                this.selectedContent = [];
            }
        },

        // 批量修改用户角色
        async bulkChangeRole() {
            if (!this.selectedUsers.length) return;
            
            const role = prompt('请输入要设置的角色（admin/moderator/user）：');
            if (!role || !['admin', 'moderator', 'user'].includes(role)) {
                alert('无效的角色');
                return;
            }

            try {
                await api.put('/admin/users/bulk-role', {
                    userIds: this.selectedUsers,
                    role: role
                });
                
                this.selectedUsers = [];
                this.selectAllUsers = false;
                this.loadUsers(this.currentPage);
                alert('批量修改角色成功');
            } catch (error) {
                console.error('批量修改角色失败:', error);
                alert('批量修改失败，请重试');
            }
        },

        // 批量删除用户
        async bulkDeleteUsers() {
            if (!this.selectedUsers.length) return;
            
            if (!confirm(`确定要删除选中的 ${this.selectedUsers.length} 个用户吗？`)) {
                return;
            }

            try {
                await api.delete('/admin/users/bulk', {
                    data: { userIds: this.selectedUsers }
                });
                
                this.selectedUsers = [];
                this.selectAllUsers = false;
                this.loadUsers(this.currentPage);
                alert('批量删除用户成功');
            } catch (error) {
                console.error('批量删除用户失败:', error);
                alert('批量删除失败，请重试');
            }
        },

        // 批量修改内容状态
        async bulkChangeStatus() {
            if (!this.selectedContent.length) return;
            
            const status = prompt('请输入要设置的状态（published/draft/archived）：');
            if (!status || !['published', 'draft', 'archived'].includes(status)) {
                alert('无效的状态');
                return;
            }

            try {
                await api.put(`/admin/${this.contentTab}/bulk-status`, {
                    contentIds: this.selectedContent,
                    status: status
                });
                
                this.selectedContent = [];
                this.selectAllContent = false;
                this.loadContent();
                alert('批量修改状态成功');
            } catch (error) {
                console.error('批量修改状态失败:', error);
                alert('批量修改失败，请重试');
            }
        },

        // 批量删除内容
        async bulkDeleteContent() {
            if (!this.selectedContent.length) return;
            
            if (!confirm(`确定要删除选中的 ${this.selectedContent.length} 个内容吗？`)) {
                return;
            }

            try {
                await api.delete(`/admin/${this.contentTab}/bulk`, {
                    data: { contentIds: this.selectedContent }
                });
                
                this.selectedContent = [];
                this.selectAllContent = false;
                this.loadContent();
                alert('批量删除内容成功');
            } catch (error) {
                console.error('批量删除内容失败:', error);
                alert('批量删除失败，请重试');
            }
        },

        // 初始化图表
        initCharts() {
            // 用户增长趋势图
            this.charts.userGrowth = new Chart(
                document.getElementById('userGrowthChart'),
                {
                    type: 'line',
                    data: {
                        labels: [],
                        datasets: [{
                            label: '新增用户数',
                            data: [],
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                }
            );

            // 内容分布饼图
            this.charts.contentDistribution = new Chart(
                document.getElementById('contentDistributionChart'),
                {
                    type: 'pie',
                    data: {
                        labels: ['教程', '公式', '问题'],
                        datasets: [{
                            data: [0, 0, 0],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                            ]
                        }]
                    },
                    options: {
                        responsive: true
                    }
                }
            );

            // 反馈类型柱状图
            this.charts.feedbackType = new Chart(
                document.getElementById('feedbackTypeChart'),
                {
                    type: 'bar',
                    data: {
                        labels: ['功能建议', '问题反馈', '内容纠错', '其他'],
                        datasets: [{
                            label: '数量',
                            data: [0, 0, 0, 0],
                            backgroundColor: 'rgb(75, 192, 192)'
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                }
            );

            // 活跃用户折线图
            this.charts.activeUsers = new Chart(
                document.getElementById('activeUsersChart'),
                {
                    type: 'line',
                    data: {
                        labels: [],
                        datasets: [{
                            label: '日活跃用户',
                            data: [],
                            borderColor: 'rgb(153, 102, 255)',
                            tension: 0.1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                }
            );
        },

        // 更新图表数据
        async updateCharts() {
            try {
                // 获取图表数据
                const response = await api.get('/admin/stats/charts');
                const data = response.data;

                // 更新用户增长趋势
                this.charts.userGrowth.data.labels = data.userGrowth.labels;
                this.charts.userGrowth.data.datasets[0].data = data.userGrowth.data;
                this.charts.userGrowth.update();

                // 更新内容分布
                this.charts.contentDistribution.data.datasets[0].data = [
                    data.contentDistribution.tutorials,
                    data.contentDistribution.formulas,
                    data.contentDistribution.questions
                ];
                this.charts.contentDistribution.update();

                // 更新反馈类型统计
                this.charts.feedbackType.data.datasets[0].data = [
                    data.feedbackType.feature,
                    data.feedbackType.bug,
                    data.feedbackType.content,
                    data.feedbackType.other
                ];
                this.charts.feedbackType.update();

                // 更新活跃用户统计
                this.charts.activeUsers.data.labels = data.activeUsers.labels;
                this.charts.activeUsers.data.datasets[0].data = data.activeUsers.data;
                this.charts.activeUsers.update();
            } catch (error) {
                console.error('更新图表数据失败:', error);
            }
        },

        // 清除缓存
        clearCache(type = null) {
            if (type) {
                this.cache[type] = type === 'users' || type === 'content' ? {} : null;
                this.lastLoadTime[type] = 0;
            } else {
                this.cache = {
                    stats: null,
                    users: {},
                    content: {},
                    feedback: null,
                    logs: null,
                    charts: null
                };
                this.lastLoadTime = {
                    stats: 0,
                    users: 0,
                    content: 0,
                    feedback: 0,
                    logs: 0,
                    charts: 0
                };
            }
        },

        // 加载当前视图
        loadCurrentView() {
            switch (this.currentView) {
                case 'dashboard':
                    this.loadStats();
                    break;
                case 'users':
                    this.loadUsers(this.currentPage);
                    break;
                case 'content':
                    this.loadContent();
                    break;
                case 'feedback':
                    this.loadFeedback();
                    break;
                case 'logs':
                    this.loadLogs();
                    break;
            }
        },

        // 重置用户筛选条件
        resetUserFilters() {
            this.userFilters = {
                search: '',
                role: '',
                status: '',
                sortBy: 'created_at',
                order: 'desc',
                registerDateStart: '',
                registerDateEnd: '',
                loginCountMin: '',
                loginCountMax: ''
            };
            this.loadUsers(1);
        }
    },

    watch: {
        // 监听视图变化
        currentView(newView) {
            switch (newView) {
                case 'dashboard':
                    this.loadStats();
                    break;
                case 'users':
                    this.loadUsers();
                    break;
                case 'content':
                    this.loadContent();
                    break;
                case 'feedback':
                    this.loadFeedback();
                    break;
                case 'logs':
                    this.loadLogs();
                    break;
            }
        },

        // 监听内容标签页变化
        contentTab() {
            this.loadContent();
        },

        // 监听用户筛选变化
        'userFilters.role'() {
            this.loadUsers(1);
        },
        'userFilters.sortBy'() {
            this.loadUsers(1);
        },
        'userFilters.order'() {
            this.loadUsers(1);
        },

        // 监听内容筛选变化
        'contentFilters.type'() {
            this.loadContent();
        },
        'contentFilters.sortBy'() {
            this.loadContent();
        },
        'contentFilters.order'() {
            this.loadContent();
        }
    },

    mounted() {
        // 检查权限
        this.checkAuth();
        // 加载初始数据
        this.loadStats();
        // 初始化模态框
        this.userModal = new bootstrap.Modal(document.getElementById('editUserModal'));
    }
});

// 挂载Vue应用
app.mount('#app'); 
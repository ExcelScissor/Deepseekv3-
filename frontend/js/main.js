// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取搜索相关元素
    const searchInput = document.querySelector('#search input');
    const searchButton = document.querySelector('#search button');

    // 搜索功能
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // TODO: 实现与后端API的连接
            console.log('搜索查询:', query);
            // 示例：这里后续将替换为实际的API调用
            alert('搜索功能即将上线！');
        }
    }

    // 绑定搜索按钮点击事件
    searchButton.addEventListener('click', performSearch);

    // 绑定回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 导航栏响应式处理
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // 如果导航栏处于展开状态，点击后自动收起
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}); 
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    const shortcutsList = document.querySelector('.shortcuts-list');
    const osButtons = document.querySelectorAll('.os-option');
    const categoryButtons = document.querySelectorAll('.shortcut-category-btn');
    
    let currentOS = 'windows';
    let currentCategory = '全部';

    // 初始化显示
    displayShortcuts();

    // 系统切换
    osButtons.forEach(button => {
        button.addEventListener('click', function() {
            osButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentOS = this.querySelector('span').textContent.toLowerCase();
            displayShortcuts();
        });
    });

    // 分类筛选
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.textContent;
            displayShortcuts();
        });
    });

    // 搜索功能
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            searchShortcuts(searchTerm);
        });
    }

    // 显示快捷键
    function displayShortcuts() {
        // ... 实现显示逻辑
    }

    // 搜索快捷键
    function searchShortcuts(term) {
        // ... 实现搜索逻辑
    }
}); 
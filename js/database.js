document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const searchInput = document.querySelector('.search-input');
    const formulaList = document.querySelector('.formula-list');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const formulaContent = document.querySelector('.formula-content');
    const formulaCategories = document.querySelectorAll('.formula-category');

    // 初始化显示所有公式
    showAllFormulas();

    // 搜索功能
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const formulaItems = document.querySelectorAll('.formula-item');
        
        formulaItems.forEach(item => {
            const formulaName = item.querySelector('h4').textContent.toLowerCase();
            const formulaDesc = item.querySelector('.description').textContent.toLowerCase();
            const formulaTags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            // 检查公式名称、描述和标签是否包含搜索词
            const isMatch = formulaName.includes(searchTerm) || 
                           formulaDesc.includes(searchTerm) ||
                           formulaTags.some(tag => tag.includes(searchTerm));
            
            // 显示或隐藏匹配的公式
            item.style.display = isMatch ? 'block' : 'none';
            
            // 如果有匹配项，确保其所在的类别也显示
            if (isMatch) {
                item.closest('.formula-category').style.display = 'block';
            }
        });
        
        // 隐藏没有匹配项的类别
        formulaCategories.forEach(category => {
            const visibleItems = category.querySelectorAll('.formula-item[style="display: block"]');
            if (visibleItems.length === 0) {
                category.style.display = 'none';
            }
        });
    });

    // 分类筛选功能
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');
            
            const category = this.textContent.trim();
            
            // 显示所有公式类别
            formulaCategories.forEach(cat => {
                cat.style.display = 'block';
            });
            
            if (category === '全部') {
                showAllFormulas();
            } else {
                // 隐藏不匹配的类别
                formulaCategories.forEach(cat => {
                    const categoryName = cat.getAttribute('data-category');
                    if (categoryName !== category) {
                        cat.style.display = 'none';
                    }
                });
            }
        });
    });

    // 显示所有公式的函数
    function showAllFormulas() {
        formulaCategories.forEach(category => {
            category.style.display = 'block';
            const items = category.querySelectorAll('.formula-item');
            items.forEach(item => {
                item.style.display = 'block';
            });
        });
    }

    // 初始化时显示所有公式
    document.addEventListener('DOMContentLoaded', showAllFormulas);
}); 
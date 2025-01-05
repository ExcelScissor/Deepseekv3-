document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    const shortcutsList = document.querySelector('.shortcuts-list');
    const osButtons = document.querySelectorAll('.os-option');
    const categoryButtons = document.querySelectorAll('.shortcut-category-btn');
    
    let currentOS = 'windows';
    let currentCategory = '全部';

    // 显示快捷键
    function displayShortcuts(filteredData = null) {
        console.log('当前系统:', currentOS);
        console.log('当前分类:', currentCategory);
        console.log('数据:', shortcutsData);
        
        const data = filteredData || shortcutsData[currentOS];
        shortcutsList.innerHTML = '';

        if (Object.keys(data).length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = '没有找到匹配的快捷键';
            shortcutsList.appendChild(noResults);
            return;
        }

        if (currentCategory === '全部') {
            // 显示所有分类
            Object.entries(data).forEach(([category, shortcuts]) => {
                console.log('显示分类:', category);
                const categorySection = createCategorySection(category, shortcuts);
                shortcutsList.appendChild(categorySection);
            });
        } else {
            // 显示特定分类
            const shortcuts = data[currentCategory];
            if (shortcuts) {
                console.log('显示特定分类:', currentCategory);
                const categorySection = createCategorySection(currentCategory, shortcuts);
                shortcutsList.appendChild(categorySection);
            }
        }
    }

    // 创建分类区块
    function createCategorySection(category, shortcuts) {
        const section = document.createElement('div');
        section.className = 'shortcut-category';
        
        const title = document.createElement('h3');
        title.textContent = category;
        section.appendChild(title);

        const shortcutGrid = document.createElement('div');
        shortcutGrid.className = 'shortcut-grid';

        shortcuts.forEach(shortcut => {
            const shortcutCard = createShortcutCard(shortcut);
            shortcutGrid.appendChild(shortcutCard);
        });

        section.appendChild(shortcutGrid);
        return section;
    }

    // 创建快捷键卡片
    function createShortcutCard(shortcut) {
        const card = document.createElement('div');
        card.className = 'shortcut-card';

        const name = document.createElement('div');
        name.className = 'shortcut-name';
        name.textContent = shortcut.name;

        const keys = document.createElement('div');
        keys.className = 'shortcut-keys';
        keys.innerHTML = shortcut.keys.map(key => 
            `<span class="key">${key}</span>`
        ).join('');

        const description = document.createElement('div');
        description.className = 'shortcut-description';
        description.textContent = shortcut.description;

        card.appendChild(name);
        card.appendChild(keys);
        card.appendChild(description);

        return card;
    }

    // 搜索功能
    function searchShortcuts(term) {
        const results = {};
        const data = shortcutsData[currentOS];

        Object.entries(data).forEach(([category, shortcuts]) => {
            const filteredShortcuts = shortcuts.filter(shortcut => 
                shortcut.name.toLowerCase().includes(term) || 
                shortcut.description.toLowerCase().includes(term) ||
                shortcut.keys.join(' ').toLowerCase().includes(term)
            );

            if (filteredShortcuts.length > 0) {
                results[category] = filteredShortcuts;
            }
        });

        displayShortcuts(results);
    }

    // 事件监听器
    osButtons.forEach(button => {
        button.addEventListener('click', function() {
            osButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentOS = this.dataset.os;
            displayShortcuts();
        });
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('点击分类按钮:', this.textContent);
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.textContent;
            displayShortcuts();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            if (searchTerm) {
                searchShortcuts(searchTerm);
            } else {
                displayShortcuts();
            }
        });
    }

    // 初始化显示
    displayShortcuts();
}); 
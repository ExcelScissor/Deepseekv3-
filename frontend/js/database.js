document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const searchInput = document.querySelector('.search-bar input');
    const formulaList = document.querySelector('.formula-list');
    const shortcutsList = document.querySelector('.shortcuts-list');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const letters = document.querySelectorAll('.letter');
    const osOptions = document.querySelectorAll('.os-option');
    const shortcutCategoryBtns = document.querySelectorAll('.shortcut-category-btn');

    // 示例公式数据
    const formulasData = [
        {
            name: 'SUM',
            category: '数学',
            syntax: 'SUM(number1, [number2], ...)',
            description: '计算单元格区域中数字的总和'
        },
        {
            name: 'AVERAGE',
            category: '数学',
            syntax: 'AVERAGE(number1, [number2], ...)',
            description: '计算参数的算术平均值'
        },
        {
            name: 'CONCATENATE',
            category: '文本',
            syntax: 'CONCATENATE(text1, [text2], ...)',
            description: '将多个文本字符串合并为一个文本字符串'
        },
        {
            name: 'DATE',
            category: '日期',
            syntax: 'DATE(year, month, day)',
            description: '返回特定日期的序列号'
        },
        {
            name: 'IF',
            category: '逻辑',
            syntax: 'IF(logical_test, value_if_true, [value_if_false])',
            description: '根据条件测试的结果返回不同的值'
        },
        {
            name: 'VLOOKUP',
            category: '查找',
            syntax: 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
            description: '在表格的第一列中查找指定的值，并返回所在行中指定列的值'
        }
    ];

    // 示例快捷键数据（添加类别）
    const shortcutsData = {
        windows: [
            { keys: 'Ctrl + C', description: '复制选中内容', category: '编辑操作' },
            { keys: 'Ctrl + V', description: '粘贴内容', category: '编辑操作' },
            { keys: 'Ctrl + X', description: '剪切选中内容', category: '编辑操作' },
            { keys: 'Ctrl + Z', description: '撤销上一步操作', category: '编辑操作' },
            { keys: 'Ctrl + Y', description: '重做上一步操作', category: '编辑操作' },
            { keys: 'Ctrl + B', description: '加粗文本', category: '格式设置' },
            { keys: 'Ctrl + I', description: '斜体文本', category: '格式设置' },
            { keys: 'Ctrl + U', description: '下划线文本', category: '格式设置' },
            { keys: 'Alt + =', description: '自动求和', category: '数据处理' },
            { keys: 'Ctrl + ;', description: '插入当前日期', category: '数据处理' },
            { keys: 'Ctrl + Space', description: '选择整列', category: '单元格操作' },
            { keys: 'Shift + Space', description: '选择整行', category: '单元格操作' },
            { keys: 'Ctrl + 1', description: '打开单元格格式对话框', category: '格式设置' },
            { keys: 'Ctrl + F', description: '查找', category: '编辑操作' },
            { keys: 'Ctrl + H', description: '替换', category: '编辑操作' },
            { keys: 'Alt + F1', description: '创建图表', category: '数据处理' },
            { keys: 'F11', description: '创建新工作表', category: '视图控制' },
            { keys: 'Ctrl + Tab', description: '切换工作表', category: '视图控制' }
        ],
        mac: [
            { keys: 'Command + C', description: '复制选中内容', category: '编辑操作' },
            { keys: 'Command + V', description: '粘贴内容', category: '编辑操作' },
            { keys: 'Command + X', description: '剪切选中内容', category: '编辑操作' },
            { keys: 'Command + Z', description: '撤销上一步操作', category: '编辑操作' },
            { keys: 'Command + Y', description: '重做上一步操作', category: '编辑操作' },
            { keys: 'Command + B', description: '加粗文本', category: '格式设置' },
            { keys: 'Command + I', description: '斜体文本', category: '格式设置' },
            { keys: 'Command + U', description: '下划线文本', category: '格式设置' },
            { keys: 'Option + =', description: '自动求和', category: '数据处理' },
            { keys: 'Command + ;', description: '插入当前日期', category: '数据处理' },
            { keys: 'Command + Space', description: '选择整列', category: '单元格操作' },
            { keys: 'Shift + Space', description: '选择整行', category: '单元格操作' },
            { keys: 'Command + 1', description: '打开单元格格式对话框', category: '格式设置' },
            { keys: 'Command + F', description: '查找', category: '编辑操作' },
            { keys: 'Command + H', description: '替换', category: '编辑操作' },
            { keys: 'Option + F1', description: '创建图表', category: '数据处理' },
            { keys: 'F11', description: '创建新工作表', category: '视图控制' },
            { keys: 'Control + Tab', description: '切换工作表', category: '视图控制' }
        ]
    };

    // 当前状态
    let currentCategory = 'all';
    let currentSystem = 'windows';
    let currentLetter = 'all';
    let currentShortcutCategory = 'all';

    // 渲染公式列表
    function renderFormulas(category = 'all', letter = 'all', searchText = '') {
        formulaList.innerHTML = '';
        
        formulasData.filter(formula => {
            const matchesCategory = category === 'all' || formula.category === category;
            const matchesLetter = letter === 'all' || formula.name.toLowerCase().startsWith(letter.toLowerCase());
            const matchesSearch = searchText === '' || 
                formula.name.toLowerCase().includes(searchText.toLowerCase()) ||
                formula.description.toLowerCase().includes(searchText.toLowerCase());
            return matchesCategory && matchesLetter && matchesSearch;
        }).forEach(formula => {
            const formulaItem = document.createElement('div');
            formulaItem.className = 'formula-item';
            formulaItem.innerHTML = `
                <div class="formula-name">${formula.name}</div>
                <div class="formula-syntax">${formula.syntax}</div>
                <div class="formula-description">${formula.description}</div>
            `;
            formulaList.appendChild(formulaItem);
        });
    }

    // 渲染快捷键列表
    function renderShortcuts(system, category = 'all', searchText = '') {
        const shortcuts = shortcutsData[system];
        shortcutsList.innerHTML = '';
        
        shortcuts.filter(shortcut => {
            const matchesCategory = category === 'all' || shortcut.category === category;
            const matchesSearch = searchText === '' || 
                   shortcut.description.toLowerCase().includes(searchText.toLowerCase());
            return matchesCategory && matchesSearch;
        }).forEach(shortcut => {
            const shortcutItem = document.createElement('div');
            shortcutItem.className = 'shortcut-item';
            shortcutItem.innerHTML = `
                <span class="shortcut-keys">${shortcut.keys}</span>
                <span class="shortcut-desc">${shortcut.description}</span>
            `;
            shortcutsList.appendChild(shortcutItem);
        });
    }

    // 分类按钮点击事件
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.textContent.toLowerCase();
            renderFormulas(currentCategory, currentLetter, searchInput.value);
        });
    });

    // 快捷键分类按钮点击事件
    shortcutCategoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            shortcutCategoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentShortcutCategory = this.textContent === '全部' ? 'all' : this.textContent;
            renderShortcuts(currentSystem, currentShortcutCategory, searchInput.value);
        });
    });

    // 字母筛选按钮点击事件（现在只用于筛选公式）
    letters.forEach(letter => {
        letter.addEventListener('click', function() {
            letters.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            currentLetter = this.textContent.toLowerCase();
            renderFormulas(currentCategory, currentLetter, searchInput.value);
        });
    });

    // 操作系统选择按钮点击事件
    osOptions.forEach(option => {
        option.addEventListener('click', function() {
            osOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            currentSystem = this.querySelector('i').classList.contains('fa-windows') ? 'windows' : 'mac';
            renderShortcuts(currentSystem, currentShortcutCategory, searchInput.value);
        });
    });

    // 搜索功能
    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        renderFormulas(currentCategory, currentLetter, searchText);
        renderShortcuts(currentSystem, currentShortcutCategory, searchText);
    });

    // 初始渲染
    renderFormulas();
    renderShortcuts('windows');
}); 
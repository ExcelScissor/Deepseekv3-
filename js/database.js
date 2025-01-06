document.addEventListener('DOMContentLoaded', function() {
    // 确保excelFormulas已定义
    if (typeof window.excelFormulas === 'undefined') {
        console.error('公式数据未加载');
        return;
    }

    // 添加调试代码
    console.log('excelFormulas:', window.excelFormulas);
    console.log('是否加载了数据文件:', typeof window.excelFormulas !== 'undefined');

    const searchInput = document.querySelector('.search-bar input');
    const formulaList = document.querySelector('.formula-list');
    const letterButtons = document.querySelectorAll('.alphabet-filter .letter');
    const categoryButtons = document.querySelectorAll('.category-filter .category-btn');

    // 初始化显示所有公式
    displayAllFormulas();

    // 搜索功能
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            console.log('搜索词:', searchTerm);
            searchFormulas(searchTerm);
        });
    } else {
        console.error('搜索输入框未找到');
    }

    // 字母筛选功能
    letterButtons.forEach(button => {
        button.addEventListener('click', function() {
            letterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const letter = this.textContent;
            if (letter === '全部') {
                displayAllFormulas();
            } else {
                displayFormulasByLetter(letter);
            }
        });
    });

    // 分类筛选功能
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.textContent;
            if (category === '全部') {
                displayAllFormulas();
            } else {
                displayFormulasByCategory(category);
            }
        });
    });

    // 搜索函数
    function searchFormulas(term) {
        console.log('执行搜索，关键词:', term);
        if (!formulaList) {
            console.error('公式列表容器未找到');
            return;
        }

        formulaList.innerHTML = '';
        
        if (!term) {
            displayAllFormulas();
            return;
        }

        let matchCount = 0;
        for (let letter in window.excelFormulas) {
            if (window.excelFormulas[letter]) {  // 添加检查
                window.excelFormulas[letter].forEach(formula => {
                    if (formula.name.toLowerCase().includes(term) || 
                        formula.description.toLowerCase().includes(term) ||
                        (formula.tags && formula.tags.some(tag => tag.toLowerCase().includes(term))) ||
                        (formula.category && formula.category.toLowerCase().includes(term))) {
                        displayFormula(formula);
                        matchCount++;
                    }
                });
            }
        }
        console.log('找到匹配公式数:', matchCount);
    }

    // 按字母显示公式
    function displayFormulasByLetter(letter) {
        formulaList.innerHTML = '';
        if (window.excelFormulas[letter]) {
            window.excelFormulas[letter].forEach(formula => {
                displayFormula(formula);
            });
        }
    }

    // 按分类显示公式
    function displayFormulasByCategory(category) {
        formulaList.innerHTML = '';
        for (let letter in window.excelFormulas) {
            if (window.excelFormulas[letter]) {  // 添加检查
                window.excelFormulas[letter].forEach(formula => {
                    if (formula.category === category) {
                        displayFormula(formula);
                    }
                });
            }
        }
    }

    // 显示单个公式
    function displayFormula(formula) {
        const formulaElement = document.createElement('div');
        formulaElement.className = 'formula-item';
        formulaElement.innerHTML = `
            <h3>${formula.name}</h3>
            <p class="description">${formula.description}</p>
            <p class="syntax"><strong>语法:</strong> ${formula.syntax}</p>
            <p class="example"><strong>示例:</strong> ${formula.example}</p>
            <p class="version"><strong>适用版本:</strong> ${formula.version}</p>
            <div class="tags">
                ${formula.tags ? formula.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
            </div>
            <p class="category"><strong>分类:</strong> ${formula.category || ''}</p>
        `;
        formulaList.appendChild(formulaElement);
    }

    // 显示所有公式
    function displayAllFormulas() {
        formulaList.innerHTML = '';
        for (let letter in window.excelFormulas) {
            if (window.excelFormulas[letter]) {  // 添加检查
                window.excelFormulas[letter].forEach(formula => {
                    displayFormula(formula);
                });
            }
        }
    }
}); 
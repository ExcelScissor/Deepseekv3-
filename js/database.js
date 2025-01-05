document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    const formulaList = document.querySelector('.formula-list');
    const letterButtons = document.querySelectorAll('.alphabet-filter .letter');

    // 初始化显示所有公式
    displayAllFormulas();

    // 搜索功能
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        searchFormulas(searchTerm);
    });

    function searchFormulas(term) {
        // 清空当前显示
        formulaList.innerHTML = '';
        
        if (!term) {
            displayAllFormulas();
            return;
        }

        // 搜索所有公式
        for (let letter in excelFormulas) {
            excelFormulas[letter].forEach(formula => {
                if (formula.name.toLowerCase().includes(term) || 
                    formula.description.toLowerCase().includes(term) ||
                    formula.tags.some(tag => tag.toLowerCase().includes(term))) {
                    displayFormula(formula);
                }
            });
        }
    }

    function displayFormula(formula) {
        const formulaElement = document.createElement('div');
        formulaElement.className = 'formula-item';
        formulaElement.innerHTML = `
            <h4>${formula.name}</h4>
            <p class="description">${formula.description}</p>
            <p class="syntax">语法: ${formula.syntax}</p>
            <p class="example">示例: ${formula.example}</p>
            <p class="version">适用版本: ${formula.version}</p>
            <div class="tags">
                ${formula.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        formulaList.appendChild(formulaElement);
    }

    // 显示所有公式
    function displayAllFormulas() {
        formulaList.innerHTML = '';
        for (let letter in excelFormulas) {
            excelFormulas[letter].forEach(formula => {
                displayFormula(formula);
            });
        }
    }

    // 按字母显示公式
    function displayFormulasByLetter(letter) {
        formulaList.innerHTML = '';
        if (excelFormulas[letter]) {
            excelFormulas[letter].forEach(formula => {
                displayFormula(formula);
            });
        }
    }

    // 字母筛选功能
    letterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            letterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');

            const letter = this.textContent;
            if (letter === '全部') {
                displayAllFormulas();
            } else {
                displayFormulasByLetter(letter);
            }
        });
    });
}); 
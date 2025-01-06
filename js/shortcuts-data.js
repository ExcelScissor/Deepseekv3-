// 快捷键数据库
const shortcutsData = {
    "windows": {
        "文件操作": [
            { name: "新建", keys: ["Ctrl", "N"], description: "新建工作簿" },
            { name: "打开", keys: ["Ctrl", "O"], description: "打开工作簿" },
            { name: "保存", keys: ["Ctrl", "S"], description: "保存当前工作簿" },
            { name: "另存为", keys: ["Ctrl", "Shift", "S"], description: "以新文件名保存" },
            { name: "打印", keys: ["Ctrl", "P"], description: "打印工作表" },
            { name: "关闭文件", keys: ["Ctrl", "W"], description: "关闭当前工作簿" },
            { name: "退出", keys: ["Alt", "F4"], description: "退出Excel" }
        ],
        "编辑": [
            { name: "撤销", keys: ["Ctrl", "Z"], description: "撤销上一步操作" },
            { name: "重做", keys: ["Ctrl", "Y"], description: "重做上一步操作" },
            { name: "剪切", keys: ["Ctrl", "X"], description: "剪切选中内容" },
            { name: "复制", keys: ["Ctrl", "C"], description: "复制选中内容" },
            { name: "粘贴", keys: ["Ctrl", "V"], description: "粘贴内容" },
            { name: "粘贴为值", keys: ["Alt", "E", "S", "V"], description: "仅粘贴数值" },
            { name: "全选", keys: ["Ctrl", "A"], description: "选择所有内容" },
            { name: "删除", keys: ["Delete"], description: "删除选中内容" },
            { name: "重命名", keys: ["F2"], description: "重命名单元格" }
        ],
        "数据处理": [
            { name: "排序", keys: ["Alt", "H", "O", "S"], description: "对数据进行排序" },
            { name: "筛选", keys: ["Alt", "A", "T", "F"], description: "设置数据筛选" },
            { name: "合并计算", keys: ["Alt", "D", "M"], description: "合并计算数据" },
            { name: "数据透视表", keys: ["Alt", "D", "P"], description: "创建数据透视表" },
            { name: "填充", keys: ["Ctrl", "D"], description: "向下填充" },
            { name: "填充序列", keys: ["Ctrl", "E"], description: "智能填充序列" },
            { name: "清除内容", keys: ["Ctrl", "Shift", "L"], description: "清除单元格内容" },
            { name: "清除格式", keys: ["Ctrl", "Shift", "A"], description: "清除单元格格式" }
        ],
        "格式设置": [
            { name: "设置为文本", keys: ["Ctrl", "Shift", "T"], description: "将单元格设置为文本格式" },
            { name: "设置为数字", keys: ["Ctrl", "Shift", "~"], description: "将单元格设置为数字格式" },
            { name: "增加小数位", keys: ["Ctrl", "Shift", "+"], description: "增加小数位数" },
            { name: "减少小数位", keys: ["Ctrl", "Shift", "-"], description: "减少小数位数" },
            { name: "加粗", keys: ["Ctrl", "B"], description: "设置文字加粗" },
            { name: "倾斜", keys: ["Ctrl", "I"], description: "设置文字倾斜" },
            { name: "下划线", keys: ["Ctrl", "U"], description: "设置文字下划线" },
            { name: "居中对齐", keys: ["Ctrl", "E"], description: "设置居中对齐" },
            { name: "左对齐", keys: ["Ctrl", "L"], description: "设置左对齐" },
            { name: "右对齐", keys: ["Ctrl", "R"], description: "设置右对齐" },
            { name: "填充格式", keys: ["Ctrl", "Shift", "F"], description: "复制格式" }
        ],
        "表格导航": [
            { name: "移动到开始", keys: ["Ctrl", "Home"], description: "移动到工作表开始" },
            { name: "移动到末尾", keys: ["Ctrl", "End"], description: "移动到工作表末尾" },
            { name: "移动到行首", keys: ["Home"], description: "移动到当前行开始" },
            { name: "移动到行尾", keys: ["End"], description: "移动到当前行末尾" },
            { name: "下移一行", keys: ["Ctrl", "Down"], description: "向下移动一行" },
            { name: "上移一行", keys: ["Ctrl", "Up"], description: "向上移动一行" },
            { name: "左移一列", keys: ["Ctrl", "Left"], description: "向左移动一列" },
            { name: "右移一列", keys: ["Ctrl", "Right"], description: "向右移动一列" },
            { name: "选择整行", keys: ["Ctrl", "Shift", "->"], description: "选择整行" },
            { name: "选择整列", keys: ["Ctrl", "Shift", "Down"], description: "选择整列" }
        ],
        "插入与删除": [
            { name: "插入行", keys: ["Ctrl", "Shift", "+"], description: "插入新行" },
            { name: "插入列", keys: ["Ctrl", "Shift", "+"], description: "插入新列" },
            { name: "删除行", keys: ["Ctrl", "-"], description: "删除选中行" },
            { name: "删除列", keys: ["Ctrl", "-"], description: "删除选中列" },
            { name: "插入单元格", keys: ["Ctrl", "Shift", "+"], description: "插入新单元格" },
            { name: "删除单元格", keys: ["Ctrl", "-"], description: "删除选中单元格" }
        ],
        "查找与选择": [
            { name: "查找", keys: ["Ctrl", "F"], description: "查找内容" },
            { name: "替换", keys: ["Ctrl", "H"], description: "查找并替换" },
            { name: "定位", keys: ["Ctrl", "G"], description: "定位到指定位置" },
            { name: "选择所有空白单元格", keys: ["Ctrl", "Shift", "Space"], description: "选择所有空白单元格" },
            { name: "选择所有数据", keys: ["Ctrl", "A"], description: "选择所有数据" }
        ],
        "视图调整": [
            { name: "冻结窗格", keys: ["Alt", "W", "F"], description: "冻结窗格" },
            { name: "拆分窗口", keys: ["Alt", "W", "S"], description: "拆分窗口" },
            { name: "全屏显示", keys: ["Alt", "V", "F"], description: "全屏显示" },
            { name: "隐藏行", keys: ["Ctrl", "9"], description: "隐藏选中行" },
            { name: "隐藏列", keys: ["Ctrl", "0"], description: "隐藏选中列" },
            { name: "显示所有隐藏行", keys: ["Ctrl", "Shift", "9"], description: "显示所有隐藏行" },
            { name: "显示所有隐藏列", keys: ["Ctrl", "Shift", "0"], description: "显示所有隐藏列" }
        ],
        "公式与函数": [
            { name: "插入函数", keys: ["Ctrl", "A"], description: "插入函数" },
            { name: "自动求和", keys: ["Alt", "="], description: "插入求和函数" },
            { name: "填充公式", keys: ["Ctrl", "D"], description: "向下填充公式" },
            { name: "复制公式", keys: ["Ctrl", "C"], description: "复制公式" },
            { name: "粘贴公式", keys: ["Ctrl", "V"], description: "粘贴公式" },
            { name: "查看公式", keys: ["Ctrl", "`"], description: "显示/隐藏公式" },
            { name: "重算所有工作表", keys: ["F9"], description: "重新计算所有工作表" },
            { name: "重算活动工作表", keys: ["Shift", "F9"], description: "重新计算当前工作表" }
        ],
        "单元格操作": [
            { name: "合并单元格", keys: ["Alt", "H", "M", "M"], description: "合并选中的单元格" },
            { name: "取消合并单元格", keys: ["Alt", "H", "M", "U"], description: "取消合并单元格" },
            { name: "自动调整行高", keys: ["Alt", "H", "O", "A"], description: "自动调整行高" },
            { name: "自动调整列宽", keys: ["Alt", "H", "O", "I"], description: "自动调整列宽" },
            { name: "手动调整行高", keys: ["Alt", "H", "O", "R"], description: "手动调整行高" },
            { name: "手动调整列宽", keys: ["Alt", "H", "O", "L"], description: "手动调整列宽" }
        ],
        "审阅与保护": [
            { name: "保护工作表", keys: ["Alt", "O", "P", "P"], description: "保护当前工作表" },
            { name: "取消保护工作表", keys: ["Alt", "O", "P", "R"], description: "取消工作表保护" },
            { name: "保护工作簿", keys: ["Alt", "F", "T", "P"], description: "保护整个工作簿" },
            { name: "取消保护工作簿", keys: ["Alt", "F", "T", "M"], description: "取消工作簿保护" },
            { name: "批注", keys: ["Shift", "F2"], description: "插入批注" },
            { name: "接受所有批注", keys: ["Ctrl", "Shift", "E"], description: "接受所有批注" },
            { name: "拒绝所有批注", keys: ["Ctrl", "Shift", "R"], description: "拒绝所有批注" }
        ],
        "页面设置": [
            { name: "页面设置", keys: ["Alt", "F", "P"], description: "打开页面设置对话框" },
            { name: "打印预览", keys: ["Ctrl", "F2"], description: "预览打印效果" },
            { name: "打印标题行", keys: ["Alt", "W", "H"], description: "设置打印标题行" },
            { name: "打印标题列", keys: ["Alt", "W", "V"], description: "设置打印标题列" }
        ],
        "宏与开发工具": [
            { name: "录制宏", keys: ["Alt", "F8"], description: "开始录制宏" },
            { name: "运行宏", keys: ["Alt", "F8"], description: "运行已保存的宏" },
            { name: "查看宏", keys: ["Alt", "F8"], description: "查看宏代码" },
            { name: "开发工具", keys: ["Alt", "F11"], description: "打开VBA编辑器" }
        ],
        "其他": [
            { name: "滚动条锁定", keys: ["Alt", "V", "L"], description: "锁定滚动条" },
            { name: "恢复工作", keys: ["Ctrl", "Y"], description: "恢复上一步操作" },
            { name: "显示/隐藏网格线", keys: ["Alt", "V", "G"], description: "切换网格线显示" },
            { name: "显示/隐藏行号和列标", keys: ["Ctrl", "Shift", "G"], description: "切换行号和列标显示" },
            { name: "显示/隐藏公式栏", keys: ["Ctrl", "Shift", "F"], description: "切换公式栏显示" }
        ]
    },
    "mac": {
        "文件操作": [
            { name: "新建", keys: ["Cmd", "N"], description: "新建工作簿" },
            { name: "打开", keys: ["Cmd", "O"], description: "打开工作簿" },
            { name: "保存", keys: ["Cmd", "S"], description: "保存当前工作簿" },
            { name: "另存为", keys: ["Cmd", "Shift", "S"], description: "以新文件名保存" },
            { name: "打印", keys: ["Cmd", "P"], description: "打印工作表" },
            { name: "关闭文件", keys: ["Cmd", "W"], description: "关闭当前工作簿" },
            { name: "退出", keys: ["Cmd", "Q"], description: "退出Excel" }
        ],
        "编辑": [
            { name: "撤销", keys: ["Cmd", "Z"], description: "撤销上一步操作" },
            { name: "重做", keys: ["Cmd", "Shift", "Z"], description: "重做上一步操作" },
            { name: "剪切", keys: ["Cmd", "X"], description: "剪切选中内容" },
            { name: "复制", keys: ["Cmd", "C"], description: "复制选中内容" },
            { name: "粘贴", keys: ["Cmd", "V"], description: "粘贴内容" },
            { name: "粘贴为值", keys: ["Cmd", "Shift", "V"], description: "仅粘贴数值" },
            { name: "全选", keys: ["Cmd", "A"], description: "选择所有内容" },
            { name: "删除", keys: ["Delete"], description: "删除选中内容" },
            { name: "重命名", keys: ["F2"], description: "重命名单元格" }
        ],
        "数据处理": [
            { name: "排序", keys: ["Cmd", "Shift", "S"], description: "对数据进行排序" },
            { name: "筛选", keys: ["Cmd", "Shift", "L"], description: "设置数据筛选" },
            { name: "合并计算", keys: ["Cmd", "Option", "M"], description: "合并计算数据" },
            { name: "数据透视表", keys: ["Cmd", "Shift", "P"], description: "创建数据透视表" },
            { name: "填充", keys: ["Cmd", "D"], description: "向下填充" },
            { name: "填充序列", keys: ["Cmd", "E"], description: "智能填充序列" },
            { name: "清除内容", keys: ["Cmd", "Shift", "L"], description: "清除单元格内容" },
            { name: "清除格式", keys: ["Cmd", "Shift", "A"], description: "清除单元格格式" }
        ],
        "格式设置": [
            { name: "设置为文本", keys: ["Cmd", "Shift", "T"], description: "将单元格设置为文本格式" },
            { name: "设置为数字", keys: ["Cmd", "Shift", "~"], description: "将单元格设置为数字格式" },
            { name: "增加小数位", keys: ["Cmd", "Shift", "+"], description: "增加小数位数" },
            { name: "减少小数位", keys: ["Cmd", "Shift", "-"], description: "减少小数位数" },
            { name: "加粗", keys: ["Cmd", "B"], description: "设置文字加粗" },
            { name: "倾斜", keys: ["Cmd", "I"], description: "设置文字倾斜" },
            { name: "下划线", keys: ["Cmd", "U"], description: "设置文字下划线" },
            { name: "居中对齐", keys: ["Cmd", "E"], description: "设置居中对齐" },
            { name: "左对齐", keys: ["Cmd", "L"], description: "设置左对齐" },
            { name: "右对齐", keys: ["Cmd", "R"], description: "设置右对齐" },
            { name: "填充格式", keys: ["Cmd", "Shift", "F"], description: "复制格式" }
        ],
        "表格导航": [
            { name: "移动到开始", keys: ["Cmd", "Up"], description: "移动到工作表开始" },
            { name: "移动到末尾", keys: ["Cmd", "Down"], description: "移动到工作表末尾" },
            { name: "移动到行首", keys: ["Cmd", "Left"], description: "移动到当前行开始" },
            { name: "移动到行尾", keys: ["Cmd", "Right"], description: "移动到当前行末尾" },
            { name: "下移一行", keys: ["Option", "Down"], description: "向下移动一行" },
            { name: "上移一行", keys: ["Option", "Up"], description: "向上移动一行" },
            { name: "左移一列", keys: ["Option", "Left"], description: "向左移动一列" },
            { name: "右移一列", keys: ["Option", "Right"], description: "向右移动一列" },
            { name: "选择整行", keys: ["Cmd", "Shift", "Right"], description: "选择整行" },
            { name: "选择整列", keys: ["Cmd", "Shift", "Down"], description: "选择整列" }
        ],
        "插入与删除": [
            { name: "插入行", keys: ["Cmd", "Shift", "+"], description: "插入新行" },
            { name: "插入列", keys: ["Cmd", "Shift", "+"], description: "插入新列" },
            { name: "删除行", keys: ["Cmd", "-"], description: "删除选中行" },
            { name: "删除列", keys: ["Cmd", "-"], description: "删除选中列" },
            { name: "插入单元格", keys: ["Cmd", "Shift", "+"], description: "插入新单元格" },
            { name: "删除单元格", keys: ["Cmd", "-"], description: "删除选中单元格" }
        ],
        "查找与选择": [
            { name: "查找", keys: ["Cmd", "F"], description: "查找内容" },
            { name: "替换", keys: ["Cmd", "H"], description: "查找并替换" },
            { name: "定位", keys: ["Cmd", "G"], description: "定位到指定位置" },
            { name: "选择所有空白单元格", keys: ["Cmd", "Shift", "Space"], description: "选择所有空白单元格" },
            { name: "选择所有数据", keys: ["Cmd", "A"], description: "选择所有数据" }
        ],
        "视图调整": [
            { name: "冻结窗格", keys: ["Cmd", "Option", "F"], description: "冻结窗格" },
            { name: "拆分窗口", keys: ["Cmd", "Option", "W"], description: "拆分窗口" },
            { name: "全屏显示", keys: ["Cmd", "Shift", "F"], description: "全屏显示" },
            { name: "隐藏行", keys: ["Cmd", "9"], description: "隐藏选中行" },
            { name: "隐藏列", keys: ["Cmd", "0"], description: "隐藏选中列" },
            { name: "显示所有隐藏行", keys: ["Cmd", "Shift", "9"], description: "显示所有隐藏行" },
            { name: "显示所有隐藏列", keys: ["Cmd", "Shift", "0"], description: "显示所有隐藏列" }
        ],
        "公式与函数": [
            { name: "插入函数", keys: ["Cmd", "A"], description: "插入函数" },
            { name: "自动求和", keys: ["Cmd", "Shift", "T"], description: "插入求和函数" },
            { name: "填充公式", keys: ["Cmd", "D"], description: "向下填充公式" },
            { name: "复制公式", keys: ["Cmd", "C"], description: "复制公式" },
            { name: "粘贴公式", keys: ["Cmd", "V"], description: "粘贴公式" },
            { name: "查看公式", keys: ["Cmd", "`"], description: "显示/隐藏公式" },
            { name: "重算所有工作表", keys: ["Cmd", "Option", "F9"], description: "重新计算所有工作表" },
            { name: "重算活动工作表", keys: ["Cmd", "Shift", "F9"], description: "重新计算当前工作表" }
        ],
        "单元格操作": [
            { name: "合并单元格", keys: ["Cmd", "Option", "M"], description: "合并选中的单元格" },
            { name: "取消合并单元格", keys: ["Cmd", "Option", "U"], description: "取消合并单元格" },
            { name: "自动调整行高", keys: ["Cmd", "Option", "A"], description: "自动调整行高" },
            { name: "自动调整列宽", keys: ["Cmd", "Option", "I"], description: "自动调整列宽" },
            { name: "手动调整行高", keys: ["Cmd", "Option", "R"], description: "手动调整行高" },
            { name: "手动调整列宽", keys: ["Cmd", "Option", "L"], description: "手动调整列宽" }
        ],
        "审阅与保护": [
            { name: "保护工作表", keys: ["Cmd", "Option", "P"], description: "保护当前工作表" },
            { name: "取消保护工作表", keys: ["Cmd", "Option", "R"], description: "取消工作表保护" },
            { name: "保护工作簿", keys: ["Cmd", "Shift", "P"], description: "保护整个工作簿" },
            { name: "取消保护工作簿", keys: ["Cmd", "Shift", "M"], description: "取消工作簿保护" },
            { name: "批注", keys: ["Cmd", "Shift", "F2"], description: "插入批注" },
            { name: "接受所有批注", keys: ["Cmd", "Shift", "E"], description: "接受所有批注" },
            { name: "拒绝所有批注", keys: ["Cmd", "Shift", "R"], description: "拒绝所有批注" }
        ],
        "页面设置": [
            { name: "页面设置", keys: ["Cmd", "Shift", "P"], description: "打开页面设置对话框" },
            { name: "打印预览", keys: ["Cmd", "Shift", "F2"], description: "预览打印效果" },
            { name: "打印标题行", keys: ["Cmd", "Option", "H"], description: "设置打印标题行" },
            { name: "打印标题列", keys: ["Cmd", "Option", "V"], description: "设置打印标题列" }
        ],
        "宏与开发工具": [
            { name: "录制宏", keys: ["Cmd", "Option", "R"], description: "开始录制宏" },
            { name: "运行宏", keys: ["Cmd", "Option", "P"], description: "运行已保存的宏" },
            { name: "查看宏", keys: ["Cmd", "Option", "V"], description: "查看宏代码" },
            { name: "开发工具", keys: ["Cmd", "Shift", "F11"], description: "打开VBA编辑器" }
        ],
        "其他": [
            { name: "滚动条锁定", keys: ["Cmd", "Option", "L"], description: "锁定滚动条" },
            { name: "恢复工作", keys: ["Cmd", "Shift", "Z"], description: "恢复上一步操作" },
            { name: "显示/隐藏网格线", keys: ["Cmd", "Option", "G"], description: "切换网格线显示" },
            { name: "显示/隐藏行号和列标", keys: ["Cmd", "Shift", "G"], description: "切换行号和列标显示" },
            { name: "显示/隐藏公式栏", keys: ["Cmd", "Shift", "F"], description: "切换公式栏显示" }
        ]
    }
};

// 确保导出变量
window.shortcutsData = shortcutsData; 
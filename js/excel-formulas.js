const excelFormulas = {
    "A": [
        {
            name: "ABS",
            description: "返回数字的绝对值。",
            syntax: "=ABS(number)",
            example: "=ABS(-4.7) 返回4.7",
            version: "Excel 97及以上",
            tags: ["数学", "绝对值"],
            category: "数字"
        },
        {
            name: "AVERAGE",
            description: "计算一组数值的平均值。",
            syntax: "=AVERAGE(number1, [number2], ...)",
            example: "=AVERAGE(B1:B10) 计算B1到B10单元格的平均值",
            version: "Excel 97及以上",
            tags: ["平均值", "数字"],
            category: "数字"
        }
    ],
    "V": [
        {
            name: "VLOOKUP",
            description: "在表格的左侧查找值，并返回对应的右侧值。",
            syntax: "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
            example: "=VLOOKUP(A1, B1:D10, 3, FALSE)",
            version: "Excel 97及以上",
            tags: ["查找", "引用"],
            category: "查找与引用"
        }
    ]
    // ... 添加更多公式
}; 
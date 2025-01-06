// 添加调试代码
console.log('excel-formulas.js 已加载');

const excelFormulas = {
    "A": [
        {
            name: "ABS",
            description: "返回数字的绝对值。",
            syntax: "=ABS(number)",
            example: "=ABS(-4.7) 返回4.7。",
            version: "Excel 97及以上",
            tags: ["数学", "绝对值"],
            category: "数字"
        },
        {
            name: "ACCRINT",
            description: "计算支付定期利息的证券的应计利息。",
            syntax: "=ACCRINT(issue, first_interest, settlement, rate, par, frequency, [basis], [calc_method])",
            example: "=ACCRINT(\"1/1/2023\", \"7/1/2023\", \"4/15/2023\", 5%, 1000, 2, 0, 0) 计算债券的应计利息。",
            version: "Excel 2003及以上",
            tags: ["财务", "利息", "证券"],
            category: "财务"
        },
        {
            name: "AVERAGE",
            description: "计算一组数值的平均值。",
            syntax: "=AVERAGE(number1, [number2], ...)",
            example: "=AVERAGE(B1:B10) 计算B1到B10单元格的平均值。",
            version: "Excel 97及以上",
            tags: ["数学", "平均值", "统计"],
            category: "数字"
        },
        {
            name: "AVERAGEIF",
            description: "计算范围内满足条件的单元格的平均值。",
            syntax: "=AVERAGEIF(range, criteria, [average_range])",
            example: "=AVERAGEIF(A1:A10, \"完成\", B1:B10)",
            version: "Excel 2007及以上",
            tags: ["数学", "平均值", "条件", "统计"],
            category: "数字"
        },
        {
            name: "AND",
            description: "如果所有条件为真，返回TRUE，否则返回FALSE。",
            syntax: "=AND(logical1, [logical2], ...)",
            example: "=AND(A1>50, B1<100) 如果两个条件都满足，返回TRUE。",
            version: "Excel 97及以上",
            tags: ["逻辑", "条件"],
            category: "逻辑"
        },
        {
            name: "AVERAGEA",
            description: "计算包含文本和数字的范围的平均值。",
            syntax: "=AVERAGEA(value1, [value2], ...)",
            example: "=AVERAGEA(A1:A10) 计算包含文本的范围平均值。",
            version: "Excel 2000及以上",
            tags: ["数学", "平均值", "统计"],
            category: "数字"
        },
        {
            name: "AVERAGEIFS",
            description: "计算满足多个条件的单元格的平均值。",
            syntax: "=AVERAGEIFS(average_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
            example: "=AVERAGEIFS(B1:B10, A1:A10, \">0\", C1:C10, \"完成\")",
            version: "Excel 2007及以上",
            tags: ["数学", "平均值", "条件", "统计"],
            category: "数字"
        }
    ],
    "B": [],
    "C": [
        {
            name: "CEILING",
            description: "将数字向上舍入到最接近的指定倍数。",
            syntax: "=CEILING(number, significance)",
            example: "=CEILING(4.2, 0.5) 返回4.5。",
            version: "Excel 2003及以上",
            tags: ["数学", "舍入"],
            category: "数字"
        },
        {
            name: "CONCATENATE",
            description: "将多个文本字符串合并为一个。",
            syntax: "=CONCATENATE(text1, [text2], ...)",
            example: "=CONCATENATE(\"Excel\", \"Scissor\") 返回\"ExcelScissor\"。",
            version: "Excel 97及以上",
            tags: ["文本", "合并"],
            category: "文本"
        },
        {
            name: "COUNT",
            description: "计算一组数值的数量。",
            syntax: "=COUNT(value1, [value2], ...)",
            example: "=COUNT(A1:A10) 计算A1到A10区域中数值的个数。",
            version: "Excel 97及以上",
            tags: ["计数", "统计"],
            category: "数字"
        },
        {
            name: "COUNTIF",
            description: "计算满足指定条件的单元格数量。",
            syntax: "=COUNTIF(range, criteria)",
            example: "=COUNTIF(A1:A10, \">0\") 计算大于0的单元格数量。",
            version: "Excel 97及以上",
            tags: ["计数", "条件", "统计"],
            category: "统计"
        },
        {
            name: "COUNTIFS",
            description: "计算满足多个条件的单元格数量。",
            syntax: "=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
            example: "=COUNTIFS(A1:A10, \">0\", B1:B10, \"完成\")",
            version: "Excel 2007及以上",
            tags: ["计数", "条件", "统计"],
            category: "统计"
        },
        {
            name: "COUNTA",
            description: "计算非空单元格的数量。",
            syntax: "=COUNTA(value1, [value2], ...)",
            example: "=COUNTA(B1:B10) 计算B1到B10中非空单元格的数量。",
            version: "Excel 97及以上",
            tags: ["计数", "统计"],
            category: "数字"
        },
        {
            name: "COLUMN",
            description: "返回引用的列号。",
            syntax: "=COLUMN([reference])",
            example: "=COLUMN(A1) 返回1。",
            version: "Excel 97及以上",
            tags: ["引用", "位置"],
            category: "查找与引用"
        },
        {
            name: "CONCAT",
            description: "将多个文本字符串连接在一起。",
            syntax: "=CONCAT(text1, [text2], ...)",
            example: "=CONCAT(\"Excel\", \"Scissor\") 返回\"ExcelScissor\"。",
            version: "Excel 2016及以上",
            tags: ["文本", "合并"],
            category: "文本"
        },
        {
            name: "CLEAN",
            description: "删除文本中的所有非打印字符。",
            syntax: "=CLEAN(text)",
            example: "=CLEAN(A1) 删除A1中的非打印字符。",
            version: "Excel 97及以上",
            tags: ["文本", "清理"],
            category: "文本"
        }
    ],
    "D": [
        {
            name: "DATE",
            description: "返回指定日期的序列号。",
            syntax: "=DATE(year, month, day)",
            example: "=DATE(2023, 12, 31) 返回2023年12月31日的序列号。",
            version: "Excel 97及以上",
            tags: ["日期"],
            category: "日期和时间"
        },
        {
            name: "DATEDIF",
            description: "计算两个日期之间的天数、月数或年数。",
            syntax: "=DATEDIF(start_date, end_date, unit)",
            example: "=DATEDIF(\"1/1/2023\", \"12/31/2023\", \"D\") 计算两个日期间的天数。",
            version: "Excel 2000及以上",
            tags: ["日期", "计算"],
            category: "日期和时间"
        },
        {
            name: "DAY",
            description: "从日期中提取日。",
            syntax: "=DAY(serial_number)",
            example: "=DAY(DATE(2023,10,31)) 返回31。",
            version: "Excel 97及以上",
            tags: ["日期"],
            category: "日期和时间"
        },
        {
            name: "DB",
            description: "使用固定余额递减法计算资产某一期间的折旧值。",
            syntax: "=DB(cost, salvage, life, period, [month])",
            example: "=DB(10000, 1000, 5, 1) 计算第一期的折旧值。",
            version: "Excel 97及以上",
            tags: ["财务", "折旧"],
            category: "财务"
        },
        {
            name: "DDB",
            description: "使用双倍余额递减法计算资产某一期间的折旧值。",
            syntax: "=DDB(cost, salvage, life, period, [factor])",
            example: "=DDB(10000, 1000, 5, 1, 2) 计算第一期的折旧值。",
            version: "Excel 97及以上",
            tags: ["财务", "折旧"],
            category: "财务"
        },
        {
            name: "DOLLAR",
            description: "将数字转换为文本，使用货币格式。",
            syntax: "=DOLLAR(number, [decimals])",
            example: "=DOLLAR(1234.567, 2) 返回\"$1,234.57\"。",
            version: "Excel 97及以上",
            tags: ["文本", "格式化", "货币"],
            category: "文本"
        }
    ],
    "E": [
        {
            name: "EDATE",
            description: "返回某个日期加上指定月数后的日期。",
            syntax: "=EDATE(start_date, months)",
            example: "=EDATE(A1, 6) 返回A1日期加上6个月后的日期。",
            version: "Excel 2003及以上",
            tags: ["日期", "计算"],
            category: "日期和时间"
        },
        {
            name: "EXACT",
            description: "检查两个文本字符串是否完全相同，包括大小写。",
            syntax: "=EXACT(text1, text2)",
            example: "=EXACT(\"Excel\", \"excel\") 返回FALSE。",
            version: "Excel 97及以上",
            tags: ["文本", "比较"],
            category: "文本"
        },
        {
            name: "EXP",
            description: "返回e的指定次方。",
            syntax: "=EXP(number)",
            example: "=EXP(1) 返回2.71828182845904。",
            version: "Excel 97及以上",
            tags: ["数学", "指数"],
            category: "数字"
        }
    ],
    "F": [
        {
            name: "FIND",
            description: "返回一个文本字符串中另一个文本字符串的位置。",
            syntax: "=FIND(find_text, within_text, [start_num])",
            example: "=FIND(\"Scissor\", \"ExcelScissor\", 1) 返回7。",
            version: "Excel 97及以上",
            tags: ["文本", "查找"],
            category: "文本"
        },
        {
            name: "FLOOR",
            description: "将数字向下舍入到最接近的指定倍数。",
            syntax: "=FLOOR(number, significance)",
            example: "=FLOOR(4.7, 0.5) 返回4.5。",
            version: "Excel 2003及以上",
            tags: ["数学", "舍入"],
            category: "数字"
        },
        {
            name: "FILTER",
            description: "根据条件筛选数组。",
            syntax: "=FILTER(array, include, [if_empty])",
            example: "=FILTER(A1:C10, A1:A10>0, \"无数据\") 返回A列大于0的对应行。",
            version: "Excel 365及以上",
            tags: ["数组", "筛选"],
            category: "查找与引用"
        }
    ],
    "G": [
        {
            name: "GCD",
            description: "返回两个或多个整数的最大公约数。",
            syntax: "=GCD(number1, [number2], ...)",
            example: "=GCD(12, 18) 返回6。",
            version: "Excel 2003及以上",
            tags: ["数学", "最大公约数"],
            category: "数字"
        }
    ],
    "H": [
        {
            name: "HOUR",
            description: "从时间中提取小时。",
            syntax: "=HOUR(serial_number)",
            example: "=HOUR(TIME(14,30,0)) 返回14。",
            version: "Excel 97及以上",
            tags: ["时间"],
            category: "日期和时间"
        }
    ],
    "I": [
        {
            name: "IFERROR",
            description: "如果公式返回错误，则返回指定值。",
            syntax: "=IFERROR(value, value_if_error)",
            example: "=IFERROR(A1/B1, \"除数不能为零\")",
            version: "Excel 2007及以上",
            tags: ["逻辑", "错误处理"],
            category: "逻辑"
        },
        {
            name: "INDEX",
            description: "返回表格或区域中的值。",
            syntax: "=INDEX(array, row_num, [column_num])",
            example: "=INDEX(A1:C10, 2, 3) 返回区域中第2行第3列的值。",
            version: "Excel 97及以上",
            tags: ["查找", "引用"],
            category: "查找与引用"
        },
        {
            name: "IF",
            description: "根据条件返回不同的值。",
            syntax: "=IF(logical_test, value_if_true, value_if_false)",
            example: "=IF(A1>50, \"Pass\", \"Fail\") 如果A1大于50返回\"Pass\"，否则返回\"Fail\"。",
            version: "Excel 97及以上",
            tags: ["逻辑", "条件"],
            category: "逻辑"
        },
        {
            name: "INDIRECT",
            description: "返回由文本字符串指定的引用。",
            syntax: "=INDIRECT(ref_text, [a1])",
            example: "=INDIRECT(\"A\"&ROW()) 返回当前行的A列单元格的值。",
            version: "Excel 97及以上",
            tags: ["引用", "间接"],
            category: "查找与引用"
        },
        {
            name: "ISBLANK",
            description: "检查单元格是否为空。",
            syntax: "=ISBLANK(value)",
            example: "=ISBLANK(A1) 如果A1为空返回TRUE。",
            version: "Excel 97及以上",
            tags: ["逻辑", "检查"],
            category: "逻辑"
        },
        {
            name: "ISERROR",
            description: "检查值是否为错误值。",
            syntax: "=ISERROR(value)",
            example: "=ISERROR(A1) 如果A1包含错误返回TRUE。",
            version: "Excel 97及以上",
            tags: ["逻辑", "错误检查"],
            category: "逻辑"
        },
        {
            name: "ISNA",
            description: "检查值是否为#N/A错误。",
            syntax: "=ISNA(value)",
            example: "=ISNA(A1) 如果A1为#N/A返回TRUE。",
            version: "Excel 97及以上",
            tags: ["逻辑", "错误检查"],
            category: "逻辑"
        },
        {
            name: "ISNUMBER",
            description: "检查值是否为数字。",
            syntax: "=ISNUMBER(value)",
            example: "=ISNUMBER(A1) 如果A1为数字返回TRUE。",
            version: "Excel 97及以上",
            tags: ["逻辑", "检查"],
            category: "逻辑"
        },
        {
            name: "ISREF",
            description: "检查值是否为引用。",
            syntax: "=ISREF(value)",
            example: "=ISREF(A1) 如果A1是有效引用返回TRUE。",
            version: "Excel 97及以上",
            tags: ["逻辑", "检查"],
            category: "逻辑"
        },
        {
            name: "ISTEXT",
            description: "检查值是否为文本。",
            syntax: "=ISTEXT(value)",
            example: "=ISTEXT(A1) 如果A1为文本返回TRUE。",
            version: "Excel 97及以上",
            tags: ["逻辑", "检查"],
            category: "逻辑"
        },
        {
            name: "IFS",
            description: "检查多个条件，返回第一个TRUE条件对应的值。",
            syntax: "=IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], ...)",
            example: "=IFS(A1>90,\"A\",A1>80,\"B\",A1>70,\"C\",TRUE,\"D\") 根据A1的值返回等级。",
            version: "Excel 2016及以上",
            tags: ["逻辑", "条件"],
            category: "逻辑"
        }
    ],
    "J": [],
    "K": [],
    "L": [
        {
            name: "LEFT",
            description: "从文本字符串的左侧提取指定数量的字符。",
            syntax: "=LEFT(text, num_chars)",
            example: "=LEFT(\"ExcelScissor\", 5) 返回\"Excel\"。",
            version: "Excel 97及以上",
            tags: ["文本", "提取"],
            category: "文本"
        },
        {
            name: "LEN",
            description: "返回文本字符串中的字符数量。",
            syntax: "=LEN(text)",
            example: "=LEN(\"ExcelScissor\") 返回11。",
            version: "Excel 97及以上",
            tags: ["文本", "长度"],
            category: "文本"
        },
        {
            name: "LN",
            description: "返回数字的自然对数。",
            syntax: "=LN(number)",
            example: "=LN(2.71828182845904) 返回1。",
            version: "Excel 97及以上",
            tags: ["数学", "对数"],
            category: "数字"
        },
        {
            name: "LOG",
            description: "返回数字的指定底数的对数。",
            syntax: "=LOG(number, [base])",
            example: "=LOG(100, 10) 返回2。",
            version: "Excel 97及以上",
            tags: ["数学", "对数"],
            category: "数字"
        },
        {
            name: "LOG10",
            description: "返回数字的以10为底的对数。",
            syntax: "=LOG10(number)",
            example: "=LOG10(1000) 返回3。",
            version: "Excel 97及以上",
            tags: ["数学", "对数"],
            category: "数字"
        },
        {
            name: "LOWER",
            description: "将文本字符串转换为小写。",
            syntax: "=LOWER(text)",
            example: "=LOWER(\"EXCEL SCISSOR\") 返回\"excel scissor\"。",
            version: "Excel 97及以上",
            tags: ["文本", "大小写"],
            category: "文本"
        },
        {
            name: "LCM",
            description: "返回整数的最小公倍数。",
            syntax: "=LCM(number1, [number2], ...)",
            example: "=LCM(4, 6) 返回12。",
            version: "Excel 2003及以上",
            tags: ["数学", "最小公倍数"],
            category: "数字"
        }
    ],
    "M": [
        {
            name: "MATCH",
            description: "在区域中搜索指定项目，返回其相对位置。",
            syntax: "=MATCH(lookup_value, lookup_array, [match_type])",
            example: "=MATCH(\"Excel\", A1:A10, 0) 返回\"Excel\"在A列中的位置。",
            version: "Excel 97及以上",
            tags: ["查找", "位置"],
            category: "查找与引用"
        },
        {
            name: "MAX",
            description: "返回一组值中的最大值。",
            syntax: "=MAX(number1, [number2], ...)",
            example: "=MAX(A1:A10) 返回A1到A10中的最大值。",
            version: "Excel 97及以上",
            tags: ["数学", "统计"],
            category: "统计"
        },
        {
            name: "MIN",
            description: "返回一组值中的最小值。",
            syntax: "=MIN(number1, [number2], ...)",
            example: "=MIN(A1:A10) 返回A1到A10中的最小值。",
            version: "Excel 97及以上",
            tags: ["数学", "统计"],
            category: "统计"
        },
        {
            name: "MID",
            description: "从文本字符串的中间提取指定数量的字符。",
            syntax: "=MID(text, start_num, num_chars)",
            example: "=MID(\"ExcelScissor\", 7, 8) 返回\"Scissor\"。",
            version: "Excel 97及以上",
            tags: ["文本", "提取"],
            category: "文本"
        },
        {
            name: "MINUTE",
            description: "从时间中提取分钟。",
            syntax: "=MINUTE(serial_number)",
            example: "=MINUTE(TIME(14,30,0)) 返回30。",
            version: "Excel 97及以上",
            tags: ["时间"],
            category: "日期和时间"
        },
        {
            name: "MOD",
            description: "返回除法运算后的余数。",
            syntax: "=MOD(number, divisor)",
            example: "=MOD(10, 3) 返回1。",
            version: "Excel 2000及以上",
            tags: ["数学", "除法"],
            category: "数字"
        },
        {
            name: "MONTH",
            description: "从日期中提取月份。",
            syntax: "=MONTH(serial_number)",
            example: "=MONTH(DATE(2023,10,31)) 返回10。",
            version: "Excel 97及以上",
            tags: ["日期"],
            category: "日期和时间"
        }
    ],
    "N": [
        {
            name: "NOW",
            description: "返回当前日期和时间。",
            syntax: "=NOW()",
            example: "=NOW() 返回当前日期和时间。",
            version: "Excel 97及以上",
            tags: ["日期", "时间"],
            category: "日期和时间"
        },
        {
            name: "N",
            description: "将值转换为数字。",
            syntax: "=N(value)",
            example: "=N(\"123\") 返回123。",
            version: "Excel 97及以上",
            tags: ["转换", "数字"],
            category: "数字"
        },
        {
            name: "NETWORKDAYS",
            description: "返回两个日期之间的工作日数量。",
            syntax: "=NETWORKDAYS(start_date, end_date, [holidays])",
            example: "=NETWORKDAYS(\"1/1/2023\", \"12/31/2023\") 返回2023年的工作日数量。",
            version: "Excel 2003及以上",
            tags: ["日期", "工作日"],
            category: "日期和时间"
        },
        {
            name: "NOT",
            description: "对逻辑值求反。",
            syntax: "=NOT(logical)",
            example: "=NOT(A1>10) 如果A1不大于10返回TRUE。",
            version: "Excel 97及以上",
            tags: ["逻辑"],
            category: "逻辑"
        },
        {
            name: "NPV",
            description: "计算基于一系列定期现金流和贴现率的净现值。",
            syntax: "=NPV(rate, value1, [value2], ...)",
            example: "=NPV(0.1, -10000, 3000, 4200, 6800) 计算投资项目的净现值。",
            version: "Excel 97及以上",
            tags: ["财务", "净现值"],
            category: "财务"
        }
    ],
    "O": [
        {
            name: "OR",
            description: "如果任一条件为真，返回TRUE，否则返回FALSE。",
            syntax: "=OR(logical1, [logical2], ...)",
            example: "=OR(A1>50, B1<100) 如果任一条件满足，返回TRUE。",
            version: "Excel 97及以上",
            tags: ["逻辑"],
            category: "逻辑"
        },
        {
            name: "OFFSET",
            description: "从给定的引用返回偏移引用。",
            syntax: "=OFFSET(reference, rows, cols, [height], [width])",
            example: "=OFFSET(A1, 2, 3, 1, 1) 返回从A1向下2行向右3列的单元格。",
            version: "Excel 97及以上",
            tags: ["引用", "偏移"],
            category: "查找与引用"
        }
    ],
    "P": [
        {
            name: "PI",
            description: "返回π的值。",
            syntax: "=PI()",
            example: "=PI() 返回3.14159265358979。",
            version: "Excel 97及以上",
            tags: ["数学", "常数"],
            category: "数字"
        },
        {
            name: "PMT",
            description: "计算贷款的每期付款额。",
            syntax: "=PMT(rate, nper, pv, [fv], [type])",
            example: "=PMT(5%/12, 60, 10000) 计算5年期10,000美元贷款的每月还款额。",
            version: "Excel 97及以上",
            tags: ["财务", "贷款", "还款"],
            category: "财务"
        },
        {
            name: "POWER",
            description: "返回数字的指定次方。",
            syntax: "=POWER(number, power)",
            example: "=POWER(2, 3) 返回8。",
            version: "Excel 97及以上",
            tags: ["数学", "指数"],
            category: "数字"
        },
        {
            name: "PPMT",
            description: "计算投资在指定期间的本金支付额。",
            syntax: "=PPMT(rate, per, nper, pv, [fv], [type])",
            example: "=PPMT(5%/12, 1, 60, 10000) 计算贷款第一月的本金支付额。",
            version: "Excel 2000及以上",
            tags: ["财务", "贷款", "本金"],
            category: "财务"
        },
        {
            name: "PROPER",
            description: "将文本字符串的每个单词首字母大写。",
            syntax: "=PROPER(text)",
            example: "=PROPER(\"excel scissor\") 返回\"Excel Scissor\"。",
            version: "Excel 97及以上",
            tags: ["文本", "大小写"],
            category: "文本"
        },
        {
            name: "PV",
            description: "计算投资的现值。",
            syntax: "=PV(rate, nper, pmt, [fv], [type])",
            example: "=PV(5%, 10, -100, 0, 0) 计算投资的现值。",
            version: "Excel 97及以上",
            tags: ["财务", "投资", "现值"],
            category: "财务"
        },
        {
            name: "PRODUCT",
            description: "返回一组数值的乘积。",
            syntax: "=PRODUCT(number1, [number2], ...)",
            example: "=PRODUCT(A1:A10) 返回A1到A10的乘积。",
            version: "Excel 97及以上",
            tags: ["数学", "乘积"],
            category: "数字"
        }
    ],
    "Q": [],
    "R": [
        {
            name: "RAND",
            description: "返回0到1之间的随机数。",
            syntax: "=RAND()",
            example: "=RAND() 返回一个随机数。",
            version: "Excel 2003及以上",
            tags: ["数学", "随机"],
            category: "数字"
        },
        {
            name: "RANDBETWEEN",
            description: "返回指定范围内的随机整数。",
            syntax: "=RANDBETWEEN(bottom, top)",
            example: "=RANDBETWEEN(1, 100) 返回1到100之间的随机整数。",
            version: "Excel 2003及以上",
            tags: ["数学", "随机"],
            category: "数字"
        },
        {
            name: "RATE",
            description: "计算年金的每期利率。",
            syntax: "=RATE(nper, pmt, pv, [fv], [type], [guess])",
            example: "=RATE(120, -200, 20000) 计算贷款的月利率。",
            version: "Excel 97及以上",
            tags: ["财务", "利率"],
            category: "财务"
        },
        {
            name: "REPLACE",
            description: "替换文本字符串中的部分文本。",
            syntax: "=REPLACE(old_text, start_num, num_chars, new_text)",
            example: "=REPLACE(\"ExcelScissor\", 6, 7, \"\") 返回\"Excel\"。",
            version: "Excel 97及以上",
            tags: ["文本", "替换"],
            category: "文本"
        },
        {
            name: "REPT",
            description: "重复文本字符串指定次数。",
            syntax: "=REPT(text, number_times)",
            example: "=REPT(\"*\", 5) 返回\"*****\"。",
            version: "Excel 97及以上",
            tags: ["文本", "重复"],
            category: "文本"
        },
        {
            name: "RIGHT",
            description: "从文本字符串的右侧提取指定数量的字符。",
            syntax: "=RIGHT(text, num_chars)",
            example: "=RIGHT(\"ExcelScissor\", 8) 返回\"Scissor\"。",
            version: "Excel 97及以上",
            tags: ["文本", "提取"],
            category: "文本"
        },
        {
            name: "ROUND",
            description: "将数值四舍五入到指定的位数。",
            syntax: "=ROUND(number, num_digits)",
            example: "=ROUND(E1, 2) 将E1的值四舍五入到小数点后两位。",
            version: "Excel 97及以上",
            tags: ["数学", "舍入"],
            category: "数字"
        },
        {
            name: "ROUNDDOWN",
            description: "将数字向下舍入到指定的位数。",
            syntax: "=ROUNDDOWN(number, num_digits)",
            example: "=ROUNDDOWN(4.7, 0) 返回4。",
            version: "Excel 2000及以上",
            tags: ["数学", "舍入"],
            category: "数字"
        },
        {
            name: "ROUNDUP",
            description: "将数字向上舍入到指定的位数。",
            syntax: "=ROUNDUP(number, num_digits)",
            example: "=ROUNDUP(4.2, 0) 返回5。",
            version: "Excel 2000及以上",
            tags: ["数学", "舍入"],
            category: "数字"
        },
        {
            name: "ROW",
            description: "返回引用的行号。",
            syntax: "=ROW([reference])",
            example: "=ROW(A1) 返回1。",
            version: "Excel 97及以上",
            tags: ["引用", "位置"],
            category: "查找与引用"
        }
    ],
    "S": [
        {
            name: "SECOND",
            description: "从时间中提取秒。",
            syntax: "=SECOND(serial_number)",
            example: "=SECOND(TIME(14,30,15)) 返回15。",
            version: "Excel 97及以上",
            tags: ["时间"],
            category: "日期和时间"
        },
        {
            name: "SIGN",
            description: "返回数字的符号。",
            syntax: "=SIGN(number)",
            example: "=SIGN(-10) 返回-1。",
            version: "Excel 97及以上",
            tags: ["数学", "符号"],
            category: "数字"
        },
        {
            name: "SLN",
            description: "计算资产的直线折旧。",
            syntax: "=SLN(cost, salvage, life)",
            example: "=SLN(10000, 1000, 5) 计算每期的折旧值。",
            version: "Excel 97及以上",
            tags: ["财务", "折旧"],
            category: "财务"
        },
        {
            name: "SORT",
            description: "对范围或数组进行排序。",
            syntax: "=SORT(array, [sort_index], [sort_order], [by_col])",
            example: "=SORT(A1:C10, 2, 1) 按第二列升序排序。",
            version: "Excel 365及以上",
            tags: ["数组", "排序"],
            category: "查找与引用"
        },
        {
            name: "SQRT",
            description: "返回数字的平方根。",
            syntax: "=SQRT(number)",
            example: "=SQRT(16) 返回4。",
            version: "Excel 97及以上",
            tags: ["数学", "平方根"],
            category: "数字"
        },
        {
            name: "SUBSTITUTE",
            description: "在文本字符串中用新文本替换旧文本。",
            syntax: "=SUBSTITUTE(text, old_text, new_text, [instance_num])",
            example: "=SUBSTITUTE(\"ExcelScissor\", \"Scissor\", \"Tool\") 返回\"ExcelTool\"。",
            version: "Excel 97及以上",
            tags: ["文本", "替换"],
            category: "文本"
        },
        {
            name: "SUM",
            description: "返回参数的和。",
            syntax: "=SUM(number1, [number2], ...)",
            example: "=SUM(A1:A10) 计算A1到A10的总和。",
            version: "Excel 97及以上",
            tags: ["数学", "求和"],
            category: "数字"
        },
        {
            name: "SUMIF",
            description: "对符合条件的值求和。",
            syntax: "=SUMIF(range, criteria, [sum_range])",
            example: "=SUMIF(A1:A10, \">50\", B1:B10) 对A列大于50的对应B列值求和。",
            version: "Excel 2000及以上",
            tags: ["数学", "求和", "条件"],
            category: "数字"
        },
        {
            name: "SUMIFS",
            description: "对符合多个条件的值求和。",
            syntax: "=SUMIFS(sum_range, criteria_range1, criteria1, ...)",
            example: "=SUMIFS(C1:C10, A1:A10, \">50\", B1:B10, \"完成\") 对满足多个条件的值求和。",
            version: "Excel 2007及以上",
            tags: ["数学", "求和", "条件"],
            category: "数字"
        },
        {
            name: "SWITCH",
            description: "根据值列表评估表达式，并返回对应的结果。",
            syntax: "=SWITCH(expression, value1, result1, [value2, result2], ..., [default])",
            example: "=SWITCH(A1, 1, \"一\", 2, \"二\", \"其他\") 根据A1的值返回对应的中文数字。",
            version: "Excel 2016及以上",
            tags: ["逻辑", "条件"],
            category: "逻辑"
        },
        {
            name: "SYD",
            description: "返回资产按年限总和折旧法计算的折旧值。",
            syntax: "=SYD(cost, salvage, life, period)",
            example: "=SYD(10000, 1000, 5, 1) 计算第一年的折旧值。",
            version: "Excel 97及以上",
            tags: ["财务", "折旧"],
            category: "财务"
        },
        {
            name: "SEARCH",
            description: "返回一个文本字符串中另一个文本字符串的位置（不区分大小写）。",
            syntax: "=SEARCH(find_text, within_text, [start_num])",
            example: "=SEARCH(\"scissor\", \"ExcelScissor\", 1) 返回7。",
            version: "Excel 97及以上",
            tags: ["文本", "查找"],
            category: "文本"
        },
        {
            name: "SIN",
            description: "返回给定角度的正弦值。",
            syntax: "=SIN(number)",
            example: "=SIN(PI()/2) 返回1。",
            version: "Excel 97及以上",
            tags: ["数学", "三角函数"],
            category: "数字"
        },
        {
            name: "STDEV",
            description: "基于样本估算标准偏差。",
            syntax: "=STDEV(number1, [number2], ...)",
            example: "=STDEV(A1:A10) 返回A1到A10的标准偏差。",
            version: "Excel 97及以上",
            tags: ["统计", "标准偏差"],
            category: "统计"
        },
        {
            name: "STDEVP",
            description: "计算总体标准偏差。",
            syntax: "=STDEVP(number1, [number2], ...)",
            example: "=STDEVP(A1:A10) 返回A1到A10的总体标准偏差。",
            version: "Excel 97及以上",
            tags: ["统计", "标准偏差"],
            category: "统计"
        },
        {
            name: "TAN",
            description: "返回给定角度的正切值。",
            syntax: "=TAN(number)",
            example: "=TAN(PI()/4) 返回1。",
            version: "Excel 97及以上",
            tags: ["数学", "三角函数"],
            category: "数字"
        },
        {
            name: "SEQUENCE",
            description: "生成一个数字序列。",
            syntax: "=SEQUENCE(rows, [columns], [start], [step])",
            example: "=SEQUENCE(5, 1, 10, 5) 生成从10开始，每次增加5，共5行的序列。",
            version: "Excel 365及以上",
            tags: ["数组", "序列"],
            category: "数字"
        }
    ],
    "T": [
        {
            name: "T",
            description: "将参数转换为文本。",
            syntax: "=T(value)",
            example: "=T(A1) 如果A1包含文本则返回该文本，否则返回空文本。",
            version: "Excel 2000及以上",
            tags: ["文本", "转换"],
            category: "文本"
        },
        {
            name: "TEXT",
            description: "将数字转换为文本并按指定格式显示。",
            syntax: "=TEXT(value, format_text)",
            example: "=TEXT(A1, \"mmm dd, yyyy\") 将日期格式化为\"Jan 01, 2023\"。",
            version: "Excel 97及以上",
            tags: ["文本", "格式化"],
            category: "文本"
        },
        {
            name: "TEXTJOIN",
            description: "合并多个范围的文本并包含分隔符。",
            syntax: "=TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)",
            example: "=TEXTJOIN(\", \", TRUE, A1:A10) 用逗号连接A1到A10的非空值。",
            version: "Excel 2016及以上",
            tags: ["文本", "合并"],
            category: "文本"
        },
        {
            name: "TIME",
            description: "返回特定时间的序列号。",
            syntax: "=TIME(hour, minute, second)",
            example: "=TIME(14, 30, 0) 返回14:30:00的序列号。",
            version: "Excel 97及以上",
            tags: ["时间"],
            category: "日期与时间"
        },
        {
            name: "TODAY",
            description: "返回当前日期的序列号。",
            syntax: "=TODAY()",
            example: "=TODAY() 返回今天的日期。",
            version: "Excel 97及以上",
            tags: ["日期"],
            category: "日期与时间"
        },
        {
            name: "TRANSPOSE",
            description: "将数组或单元格范围从行转换为列，或从列转换为行。",
            syntax: "=TRANSPOSE(array)",
            example: "=TRANSPOSE(A1:D1) 将一行数据转换为一列。",
            version: "Excel 97及以上",
            tags: ["数组", "转置"],
            category: "查找与引用"
        },
        {
            name: "TRIM",
            description: "删除文本中的多余空格。",
            syntax: "=TRIM(text)",
            example: "=TRIM(\" Excel  Scissor \") 返回\"Excel Scissor\"。",
            version: "Excel 97及以上",
            tags: ["文本", "清理"],
            category: "文本"
        },
        {
            name: "TRUNC",
            description: "将数字截断为整数。",
            syntax: "=TRUNC(number, [num_digits])",
            example: "=TRUNC(4.9) 返回4。",
            version: "Excel 2000及以上",
            tags: ["数学", "截断"],
            category: "数字"
        }
    ],
    "U": [
        {
            name: "UPPER",
            description: "将文本转换为大写。",
            syntax: "=UPPER(text)",
            example: "=UPPER(\"Excel Scissor\") 返回\"EXCEL SCISSOR\"。",
            version: "Excel 97及以上",
            tags: ["文本", "大小写"],
            category: "文本"
        }
    ],
    "V": [
        {
            name: "VALUE",
            description: "将文本转换为数字。",
            syntax: "=VALUE(text)",
            example: "=VALUE(\"123\") 返回123。",
            version: "Excel 97及以上",
            tags: ["文本", "转换", "数字"],
            category: "文本"
        },
        {
            name: "VLOOKUP",
            description: "在表格的第一列中查找某个值，并返回所在行中指定列的值。",
            syntax: "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
            example: "=VLOOKUP(\"Excel\", A1:C10, 2, FALSE) 查找\"Excel\"并返回对应行的第二列值。",
            version: "Excel 97及以上",
            tags: ["查找", "引用"],
            category: "查找与引用"
        }
    ],
    "X": [
        {
            name: "XLOOKUP",
            description: "在范围或数组中查找匹配项，并返回对应的项。",
            syntax: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
            example: "=XLOOKUP(\"Excel\", A1:A10, B1:B10, \"未找到\", 0) 查找\"Excel\"并返回对应的B列值。",
            version: "Excel 365及以上",
            tags: ["查找", "引用"],
            category: "查找与引用"
        },
        {
            name: "XOR",
            description: "返回所有参数的异或值。",
            syntax: "=XOR(logical1, [logical2], ...)",
            example: "=XOR(A1>10, B1<0) 当且仅当一个条件为真时返回TRUE。",
            version: "Excel 2013及以上",
            tags: ["逻辑"],
            category: "逻辑"
        }
    ],
    "Y": [
        {
            name: "YEAR",
            description: "返回日期的年份。",
            syntax: "=YEAR(serial_number)",
            example: "=YEAR(DATE(2023,12,31)) 返回2023。",
            version: "Excel 97及以上",
            tags: ["日期"],
            category: "日期与时间"
        },
        {
            name: "YIELD",
            description: "计算债券的收益率。",
            syntax: "=YIELD(settlement, maturity, rate, pr, redemption, frequency, [basis])",
            example: "=YIELD(\"1/1/2023\", \"1/1/2025\", 5%, 95, 100, 2) 计算债券收益率。",
            version: "Excel 2003及以上",
            tags: ["财务", "债券", "收益率"],
            category: "财务"
        }
    ]
}; 

// 确保导出变量
window.excelFormulas = excelFormulas; 
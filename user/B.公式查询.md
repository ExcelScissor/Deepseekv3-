#### 1. SUM

- **用途**: 计算一组数值的总和。
    
- **类别**: 数字
    
- **语法**: `=SUM(number1, [number2], ...)`
    
- **示例**: `=SUM(A1:A10)` 计算A1到A10单元格的总和，假设A1到A10包含数值数据。
    
- **适用版本**: Excel 97及以上
    

#### 2. AVERAGE

- **用途**: 计算一组数值的平均值。
    
- **类别**: 数字
    
- **语法**: `=AVERAGE(number1, [number2], ...)`
    
- **示例**: `=AVERAGE(B1:B10)` 计算B1到B10单元格的平均值，假设B1到B10包含数值数据。
    
- **适用版本**: Excel 97及以上
    

#### 3. IF

- **用途**: 根据条件返回不同的值。
    
- **类别**: 逻辑
    
- **语法**: `=IF(condition, value_if_true, value_if_false)`
    
- **示例**: `=IF(C1>50, "Pass", "Fail")` 如果C1大于50，返回"Pass"，否则返回"Fail"。
    
- **适用版本**: Excel 97及以上
    

#### 4. VLOOKUP

- **用途**: 在表格的左侧查找值，并返回对应的右侧值。
    
- **类别**: 查找与引用
    
- **语法**: `=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])`
    
- **示例**: `=VLOOKUP(A1, B1:D10, 3, FALSE)` 在B1到D10区域中查找A1的值，并返回第三列的值，假设B1到D10是一个数据表。
    
- **适用版本**: Excel 97及以上
    

#### 5. CONCATENATE

- **用途**: 将多个文本字符串合并为一个。
    
- **类别**: 文本
    
- **语法**: `=CONCATENATE(text1, [text2], ...)`
    
- **示例**: `=CONCATENATE("Excel", "Scissor")` 返回"ExcelScissor"。
    
- **适用版本**: Excel 97及以上
    

#### 6. COUNT

- **用途**: 计算包含数字的单元格数量。
    
- **类别**: 数字
    
- **语法**: `=COUNT(value1, [value2], ...)`
    
- **示例**: `=COUNT(A1:A10)` 计算A1到A10中包含数字的单元格数量，假设A1到A10包含混合数据。
    
- **适用版本**: Excel 97及以上
    

#### 7. COUNTA

- **用途**: 计算非空单元格的数量。
    
- **类别**: 数字
    
- **语法**: `=COUNTA(value1, [value2], ...)`
    
- **示例**: `=COUNTA(B1:B10)` 计算B1到B10中非空单元格的数量，假设B1到B10包含混合数据。
    
- **适用版本**: Excel 97及以上
    

#### 8. MAX

- **用途**: 返回一组数值中的最大值。
    
- **类别**: 数字
    
- **语法**: `=MAX(number1, [number2], ...)`
    
- **示例**: `=MAX(C1:C10)` 返回C1到C10中的最大值，假设C1到C10包含数值数据。
    
- **适用版本**: Excel 97及以上
    

#### 9. MIN

- **用途**: 返回一组数值中的最小值。
    
- **类别**: 数字
    
- **语法**: `=MIN(number1, [number2], ...)`
    
- **示例**: `=MIN(D1:D10)` 返回D1到D10中的最小值，假设D1到D10包含数值数据。
    
- **适用版本**: Excel 97及以上
    

#### 10. ROUND

- **用途**: 将数值四舍五入到指定的位数。
    
- **类别**: 数字
    
- **语法**: `=ROUND(number, num_digits)`
    
- **示例**: `=ROUND(E1, 2)` 将E1的值四舍五入到小数点后两位，假设E1包含数值。
    
- **适用版本**: Excel 97及以上
    

#### 11. LEFT

- **用途**: 从文本字符串的左侧提取指定数量的字符。
    
- **类别**: 文本
    
- **语法**: `=LEFT(text, num_chars)`
    
- **示例**: `=LEFT("ExcelScissor", 5)` 返回"Excel"。
    
- **适用版本**: Excel 97及以上
    

#### 12. RIGHT

- **用途**: 从文本字符串的右侧提取指定数量的字符。
    
- **类别**: 文本
    
- **语法**: `=RIGHT(text, num_chars)`
    
- **示例**: `=RIGHT("ExcelScissor", 8)` 返回"Scissor"。
    
- **适用版本**: Excel 97及以上
    

#### 13. MID

- **用途**: 从文本字符串的中间提取指定数量的字符。
    
- **类别**: 文本
    
- **语法**: `=MID(text, start_num, num_chars)`
    
- **示例**: `=MID("ExcelScissor", 7, 8)` 返回"Scissor"。
    
- **适用版本**: Excel 97及以上
    

#### 14. LEN

- **用途**: 返回文本字符串中的字符数量。
    
- **类别**: 文本
    
- **语法**: `=LEN(text)`
    
- **示例**: `=LEN("ExcelScissor")` 返回11。
    
- **适用版本**: Excel 97及以上
    

#### 15. TRIM

- **用途**: 去除文本字符串中的多余空格。
    
- **类别**: 文本
    
- **语法**: `=TRIM(text)`
    
- **示例**: `=TRIM(" Excel Scissor ")` 返回"Excel Scissor"。
    
- **适用版本**: Excel 97及以上
    

#### 16. UPPER

- **用途**: 将文本字符串转换为大写。
    
- **类别**: 文本
    
- **语法**: `=UPPER(text)`
    
- **示例**: `=UPPER("excel scissor")` 返回"EXCEL SCISSOR"。
    
- **适用版本**: Excel 97及以上
    

#### 17. LOWER

- **用途**: 将文本字符串转换为小写。
    
- **类别**: 文本
    
- **语法**: `=LOWER(text)`
    
- **示例**: `=LOWER("EXCEL SCISSOR")` 返回"excel scissor"。
    
- **适用版本**: Excel 97及以上
    

#### 18. PROPER

- **用途**: 将文本字符串的每个单词首字母大写。
    
- **类别**: 文本
    
- **语法**: `=PROPER(text)`
    
- **示例**: `=PROPER("excel scissor")` 返回"Excel Scissor"。
    
- **适用版本**: Excel 97及以上
    

#### 19. FIND

- **用途**: 返回一个文本字符串中另一个文本字符串的位置。
    
- **类别**: 文本
    
- **语法**: `=FIND(find_text, within_text, [start_num])`
    
- **示例**: `=FIND("Scissor", "ExcelScissor", 1)` 返回7。
    
- **适用版本**: Excel 97及以上
    

#### 20. REPLACE

- **用途**: 用新的文本替换文本字符串中的部分文本。
    
- **类别**: 文本
    
- **语法**: `=REPLACE(old_text, start_num, num_chars, new_text)`
    
- **示例**: `=REPLACE("ExcelScissor", 7, 8, "Tool")` 返回"ExcelTool"。
    
- **适用版本**: Excel 97及以上
    

#### 21. SUBSTITUTE

- **用途**: 用新的文本替换文本字符串中的指定文本。
    
- **类别**: 文本
    
- **语法**: `=SUBSTITUTE(text, old_text, new_text, [instance_num])`
    
- **示例**: `=SUBSTITUTE("ExcelScissor", "Scissor", "Tool")` 返回"ExcelTool"。
    
- **适用版本**: Excel 97及以上
    

#### 22. DATE

- **用途**: 创建一个日期值。
    
- **类别**: 日期与时间
    
- **语法**: `=DATE(year, month, day)`
    
- **示例**: `=DATE(2023, 10, 31)` 返回2023年10月31日。
    
- **适用版本**: Excel 97及以上
    

#### 23. TODAY

- **用途**: 返回当前日期。
    
- **类别**: 日期与时间
    
- **语法**: `=TODAY()`
    
- **示例**: `=TODAY()` 返回当前日期。
    
- **适用版本**: Excel 97及以上
    

#### 24. TIME

- **用途**: 创建一个时间值。
    
- **类别**: 日期与时间
    
- **语法**: `=TIME(hour, minute, second)`
    
- **示例**: `=TIME(14, 30, 0)` 返回14:30:00。
    
- **适用版本**: Excel 97及以上
    

#### 25. NOW

- **用途**: 返回当前日期和时间。
    
- **类别**: 日期与时间
    
- **语法**: `=NOW()`
    
- **示例**: `=NOW()` 返回当前日期和时间。
    
- **适用版本**: Excel 97及以上
    

#### 26. YEAR

- **用途**: 从日期中提取年份。
    
- **类别**: 日期与时间
    
- **语法**: `=YEAR(serial_number)`
    
- **示例**: `=YEAR(DATE(2023,10,31))` 返回2023。
    
- **适用版本**: Excel 97及以上
    

#### 27. MONTH

- **用途**: 从日期中提取月份。
    
- **类别**: 日期与时间
    
- **语法**: `=MONTH(serial_number)`
    
- **示例**: `=MONTH(DATE(2023,10,31))` 返回10。
    
- **适用版本**: Excel 97及以上
    

#### 28. DAY

- **用途**: 从日期中提取日。
    
- **类别**: 日期与时间
    
- **语法**: `=DAY(serial_number)`
    
- **示例**: `=DAY(DATE(2023,10,31))` 返回31。
    
- **适用版本**: Excel 97及以上
    

#### 29. HOUR

- **用途**: 从时间中提取小时。
    
- **类别**: 日期与时间
    
- **语法**: `=HOUR(serial_number)`
    
- **示例**: `=HOUR(TIME(14,30,0))` 返回14。
    
- **适用版本**: Excel 97及以上
    

#### 30. MINUTE

- **用途**: 从时间中提取分钟。
    
- **类别**: 日期与时间
    
- **语法**: `=MINUTE(serial_number)`
    
- **示例**: `=MINUTE(TIME(14,30,0))` 返回30。
    
- **适用版本**: Excel 97及以上
    

#### 31. SECOND

- **用途**: 从时间中提取秒。
    
- **类别**: 日期与时间
    
- **语法**: `=SECOND(serial_number)`
    
- **示例**: `=SECOND(TIME(14,30,0))` 返回0。
    
- **适用版本**: Excel 97及以上
    

#### 32. NETWORKDAYS

- **用途**: 计算两个日期之间的工龄日（排除周末和假期）。
    
- **类别**: 日期与时间
    
- **语法**: `=NETWORKDAYS(start_date, end_date, [holidays])`
    
- **示例**: `=NETWORKDAYS(A1, B1, C1:C5)` 计算A1和B1之间的工龄日，排除C1:C5 中的假期，假设A1和B1是日期，C1:C5 是假期列表。
    
- **适用版本**: Excel 2003及以上
    

#### 33. IFERROR

- **用途**: 捕获并处理公式中的错误。
    
- **类别**: 逻辑
    
- **语法**: `=IFERROR(value, value_if_error)`
    
- **示例**: `=IFERROR(A1/B1, "除法错误")` 如果B1为零，返回“除法错误”，假设A1和B1包含数值。
    
- **适用版本**: Excel 2007及以上
    

#### 34. INDEX

- **用途**: 返回表格中指定行和列号的单元格值。
    
- **类别**: 查找与引用
    
- **语法**: `=INDEX(array, row_num, [column_num])`
    
- **示例**: `=INDEX(A1:C10, 5, 3)` 返回A1:C10 范围中第5行第3列的值，假设A1:C10 是一个数据表。
    
- **适用版本**: Excel 97及以上
    

#### 35. MATCH

- **用途**: 查找值在范围内的位置。
    
- **类别**: 查找与引用
    
- **语法**: `=MATCH(lookup_value, lookup_array, [match_type])`
    
- **示例**: `=MATCH("Excel", A1:A10, 0)` 查找“Excel”在A1:A10 中的位置，假设A1:A10 包含文本数据。
    
- **适用版本**: Excel 97及以上
    

#### 36. OFFSET

- **用途**: 返回从给定引用偏移指定行和列的范围引用。
    
- **类别**: 查找与引用
    
- **语法**: `=OFFSET(reference, rows, cols, [height], [width])`
    
- **示例**: `=OFFSET(A1, 2, 3, 1, 1)` 返回D3单元格的值，假设A1是起始引用。
    
- **适用版本**: Excel 97及以上
    

#### 37. COUNTIF

- **用途**: 计算范围内满足条件的单元格数量。
    
- **类别**: 数字
    
- **语法**: `=COUNTIF(range, criteria)`
    
- **示例**: `=COUNTIF(A1:A10, ">50")` 计算A1:A10 中大于50的单元格数量，假设A1:A10 包含数值数据。
    
- **适用版本**: Excel 2000及以上
    

#### 38. SUMIF

- **用途**: 计算范围内满足条件的单元格的和。
    
- **类别**: 数字
    
- **语法**: `=SUMIF(range, criteria, [sum_range])`
    
- **示例**: `=SUMIF(A1:A10, "Excel", B1:B10)` 计算B1:B10 中A1:A10 为“Excel”的和，假设A1:A10 包含文本，B1:B10 包含数值。
    
- **适用版本**: Excel 2000及以上
    

#### 39. AVERAGEIF

- **用途**: 计算范围内满足条件的单元格的平均值。
    
- **类别**: 数字
    
- **语法**: `=AVERAGEIF(range, criteria, [average_range])`
    
- **示例**: `=AVERAGEIF(A1:A10, "完成", B1:B10)` 计算B1:B10 中A1:A10 为“完成”的平均值，假设A1:A10 包含状态，B1:B10 包含数值。
    
- **适用版本**: Excel 2007及以上
    

#### 40. COUNTIFS

- **用途**: 计算多个范围内满足多个条件的单元格数量。
    
- **类别**: 数字
    
- **语法**: `=COUNTIFS(range1, criteria1, range2, criteria2, ...)`
    
- **示例**: `=COUNTIFS(A1:A10, "Excel", B1:B10, ">50")` 计算A1:A10 为“Excel”且B1:B10 大于50的单元格数量，假设A1:A10 包含文本，B1:B10 包含数值。
    
- **适用版本**: Excel 2007及以上
    

#### 41. SUMIFS

- **用途**: 计算多个范围内满足多个条件的单元格的和。
    
- **类别**: 数字
    
- **语法**: `=SUMIFS(sum_range, range1, criteria1, range2, criteria2, ...)`
    
- **示例**: `=SUMIFS(C1:C10, A1:A10, "Excel", B1:B10, ">50")` 计算C1:C10 中A1:A10 为“Excel”且B1:B10 大于50的和，假设A1:A10 包含文本，B1:B10 包含条件数值，C1:C10 包含求和数值。
    
- **适用版本**: Excel 2007及以上
    

#### 42. AND

- **用途**: 如果所有条件为真，返回TRUE，否则返回FALSE。
    
- **类别**: 逻辑
    
- **语法**: `=AND(logical1, [logical2], ...)`
    
- **示例**: `=AND(A1>50, B1<100)` 如果两个条件都满足，返回TRUE，假设A1和B1包含数值。
    
- **适用版本**: Excel 97及以上
    

#### 43. OR

- **用途**: 如果任一条件为真，返回TRUE，否则返回FALSE。
    
- **类别**: 逻辑
    
- **语法**: `=OR(logical1, [logical2], ...)`
    
- **示例**: `=OR(A1>50, B1<100)` 如果任一条件满足，返回TRUE，假设A1和B1包含数值。
    
- **适用版本**: Excel 97及以上
    

#### 44. NOT

- **用途**: 反转逻辑值。
    
- **类别**: 逻辑
    
- **语法**: `=NOT(logical)`
    
- **示例**: `=NOT(A1>50)` 如果A1>50为TRUE，返回FALSE，假设A1包含数值。
    
- **适用版本**: Excel 97及以上
    

#### 45. XOR

- **用途**: 如果奇数个参数为TRUE，返回TRUE，否则返回FALSE。
    
- **类别**: 逻辑
    
- **语法**: `=XOR(logical1, [logical2], ...)`
    
- **示例**: `=XOR(A1>50, B1<100)` 如果仅一个条件满足，返回TRUE，假设A1和B1包含数值。
    
- **适用版本**: Excel 2013及以上
    

#### 46. ISBLANK

- **用途**: 检查单元格是否为空。
    
- **类别**: 逻辑
    
- **语法**: `=ISBLANK(value)`
    
- **示例**: `=ISBLANK(A1)` 如果A1为空，返回TRUE，假设A1是需要检查的单元格。
    
- **适用版本**: Excel 2000及以上
    

#### 47. ISNUMBER

- **用途**: 检查值是否为数字。
    
- **类别**: 逻辑
    
- **语法**: `=ISNUMBER(value)`
    
- **示例**: `=ISNUMBER(A1)` 如果A1包含数字，返回TRUE，假设A1包含数据。
    
- **适用版本**: Excel 97及以上
    

#### 48. ISTEXT

- **用途**: 检查值是否为文本。
    
- **类别**: 逻辑
    
- **语法**: `=ISTEXT(value)`
    
- **示例**: `=ISTEXT(A1)` 如果A1包含文本，返回TRUE，假设A1包含数据。
    
- **适用版本**: Excel 97及以上
    

#### 49. ISERROR

- **用途**: 检查单元格是否包含任何错误值。
    
- **类别**: 逻辑
    
- **语法**: `=ISERROR(value)`
    
- **示例**: `=ISERROR(A1)` 如果A1包含错误，返回TRUE，假设A1包含公式或值。
    
- **适用版本**: Excel 2000及以上
    

#### 50. ISNA

- **用途**: 检查单元格是否包含#N/A错误。
    
- **类别**: 逻辑
    
- **语法**: `=ISNA(value)`
    
- **示例**: `=ISNA(A1)` 如果A1包含#N/A，返回TRUE，假设A1包含公式或值。
    
- **适用版本**: Excel 97及以上
    

#### 51. ISREF

- **用途**: 检查值是否为引用。
    
- **类别**: 逻辑
    
- **语法**: `=ISREF(value)`
    
- **示例**: `=ISREF(A1)` 如果A1是引用，返回TRUE，假设A1包含引用。
    
- **适用版本**: Excel 97及以上
    

#### 52. ROW

- **用途**: 返回引用的行号。
    
- **类别**: 查找与引用
    
- **语法**: `=ROW([reference])`
    
- **示例**: `=ROW(A1)` 返回1，假设A1是引用。
    
- **适用版本**: Excel 97及以上
    

#### 53. COLUMN

- **用途**: 返回引用的列号。
    
- **类别**: 查找与引用
    
- **语法**: `=COLUMN([reference])`
    
- **示例**: `=COLUMN(A1)` 返回1，假设A1是引用。
    
- **适用版本**: Excel 97及以上
    

#### 54. TRANSPOSE

- **用途**: 转换单元格范围的方向（行转列或列转行）。
    
- **类别**: 查找与引用
    
- **语法**: `=TRANSPOSE(array)`
    
- **示例**: `=TRANSPOSE(A1:C3)` 转换A1:C3 范围，假设A1:C3 是一个数据表。
    
- **适用版本**: Excel 97及以上
    

#### 55. INDIRECT

- **用途**: 返回由文本字符串指定的引用。
    
- **类别**: 查找与引用
    
- **语法**: `=INDIRECT(ref_text, [a1])`
    
- **示例**: `=INDIRECT("A1")` 返回A1单元格的值，假设A1包含数据。
    
- **适用版本**: Excel 2000及以上
    

#### 56. CEILING

- **用途**: 将数字向上舍入到最接近的指定倍数。
    
- **类别**: 数字
    
- **语法**: `=CEILING(number, significance)`
    
- **示例**: `=CEILING(4.2, 0.5)` 返回4.5。
    
- **适用版本**: Excel 2003及以上
    

#### 57. FLOOR

- **用途**: 将数字向下舍入到最接近的指定倍数。
    
- **类别**: 数字
    
- **语法**: `=FLOOR(number, significance)`
    
- **示例**: `=FLOOR(4.7, 0.5)` 返回4.5。
    
- **适用版本**: Excel 2003及以上
    

#### 58. MROUND

- **用途**: 将数字舍入到最接近的指定倍数。
    
- **类别**: 数字
    
- **语法**: `=MROUND(number, multiple)`
    
- **示例**: `=MROUND(4.3, 0.5)` 返回4.5。
    
- **适用版本**: Excel 2003及以上
    

#### 59. INT

- **用途**: 将数字向下舍入到最接近的整数。
    
- **类别**: 数字
    
- **语法**: `=INT(number)`
    
- **示例**: `=INT(4.7)` 返回4。
    
- **适用版本**: Excel 97及以上
    

#### 60. TRUNC

- **用途**: 将数字截断为指定的小数位数。
    
- **类别**: 数字
    
- **语法**: `=TRUNC(number, [num_digits])`
    
- **示例**: `=TRUNC(4.765, 2)` 返回4.76。
    
- **适用版本**: Excel 2000及以上
    

#### 61. ABS

- **用途**: 返回数字的绝对值。
    
- **类别**: 数字
    
- **语法**: `=ABS(number)`
    
- **示例**: `=ABS(-4.7)` 返回4.7。
    
- **适用版本**: Excel 97及以上
    

#### 62. SIGN

- **用途**: 确定数字的符号（正、负或零）。
    
- **类别**: 数字
    
- **语法**: `=SIGN(number)`
    
- **示例**: `=SIGN(-4.7)` 返回-1。
    
- **适用版本**: Excel 2003及以上
    

#### 63. RAND

- **用途**: 返回0和1之间的随机数。
    
- **类别**: 数字
    
- **语法**: `=RAND()`
    
- **示例**: `=RAND()` 返回如0.6789的随机数。
    
- **适用版本**: Excel 97及以上
    

#### 64. RANDBETWEEN

- **用途**: 返回两个指定数字之间的随机整数。
    
- **类别**: 数字
    
- **语法**: `=RANDBETWEEN(bottom, top)`
    
- **示例**: `=RANDBETWEEN(1, 100)` 返回1到100之间的随机整数。
    
- **适用版本**: Excel 2003及以上
    

#### 65. PI

- **用途**: 返回π（pi）的值。
    
- **类别**: 数字
    
- **语法**: `=PI()`
    
- **示例**: `=PI()` 返回3.14159265358979。
    
- **适用版本**: Excel 97及以上
    

#### 66. SQRT

- **用途**: 返回数字的平方根。
    
- **类别**: 数字
    
- **语法**: `=SQRT(number)`
    
- **示例**: `=SQRT(16)` 返回4。
    
- **适用版本**: Excel 97及以上
    

#### 67. POWER

- **用途**: 返回数字的指定次方。
    
- **类别**: 数字
    
- **语法**: `=POWER(number, power)`
    
- **示例**: `=POWER(2, 3)` 返回8。
    
- **适用版本**: Excel 97及以上
    

#### 68. EXP

- **用途**: 返回e的指定次方。
    
- **类别**: 数字
    
- **语法**: `=EXP(number)`
    
- **示例**: `=EXP(1)` 返回2.71828182845904。
    
- **适用版本**: Excel 97及以上
    

#### 69. LN

- **用途**: 返回数字的自然对数。
    
- **类别**: 数字
    
- **语法**: `=LN(number)`
    
- **示例**: `=LN(2.71828182845904)` 返回1。
    
- **适用版本**: Excel 97及以上
    

#### 70. LOG

- **用途**: 返回数字的指定底数的对数。
    
- **类别**: 数字
    
- **语法**: `=LOG(number, [base])`
    
- **示例**: `=LOG(100, 10)` 返回2。
    
- **适用版本**: Excel 97及以上
    

#### 71. LOG10

- **用途**: 返回数字的以10为底的对数。
    
- **类别**: 数字
    
- **语法**: `=LOG10(number)`
    
- **示例**: `=LOG10(1000)` 返回3。
    
- **适用版本**: Excel 97及以上
    

#### 72. MOD

- **用途**: 返回除法运算后的余数。
    
- **类别**: 数字
    
- **语法**: `=MOD(number, divisor)`
    
- **示例**: `=MOD(10, 3)` 返回1。
    
- **适用版本**: Excel 2000及以上
    

#### 73. GCD

- **用途**: 返回两个或多个整数的最大公约数。
    
- **类别**: 数字
    
- **语法**: `=GCD(number1, number2, ...)`
    
- **示例**: `=GCD(12, 18)` 返回6。
    
- **适用版本**: Excel 2003及以上
    

#### 74. LCM

- **用途**: 返回两个或多个整数的最小公倍数。
    
- **类别**: 数字
    
- **语法**: `=LCM(number1, number2, ...)`
    
- **示例**: `=LCM(4, 6)` 返回12。
    
- **适用版本**: Excel 2003及以上
    

#### 75. ROUNDUP

- **用途**: 将数字向上舍入到指定的小数位数。
    
- **类别**: 数字
    
- **语法**: `=ROUNDUP(number, num_digits)`
    
- **示例**: `=ROUNDUP(4.2, 0)` 返回5。
    
- **适用版本**: Excel 2000及以上
    

#### 76. ROUNDDOWN

- **用途**: 将数字向下舍入到指定的小数位数。
    
- **类别**: 数字
    
- **语法**: `=ROUNDDOWN(number, num_digits)`
    
- **示例**: `=ROUNDDOWN(4.7, 0)` 返回4。
    
- **适用版本**: Excel 2000及以上
    

#### 77. DOLLAR

- **用途**: 将数字转换为文本，使用美元货币格式。
    
- **类别**: 文本
    
- **语法**: `=DOLLAR(number, [decimals])`
    
- **示例**: `=DOLLAR(1000.50, 2)` 返回“$1,000.50”。
    
- **适用版本**: Excel 97及以上
    

#### 78. TEXT

- **用途**: 将值转换为指定格式的文本。
    
- **类别**: 文本
    
- **语法**: `=TEXT(value, format_text)`
    
- **示例**: `=TEXT(A1, "mmm dd, yyyy")` 将A1中的日期格式化为“Jan 01, 2023”，假设A1包含日期。
    
- **适用版本**: Excel 97及以上
    

#### 79. VALUE

- **用途**: 将表示数字的文本转换为数字。
    
- **类别**: 文本
    
- **语法**: `=VALUE(text)`
    
- **示例**: `=VALUE("123")` 返回123。
    
- **适用版本**: Excel 97及以上
    

#### 80. CLEAN

- **用途**: 从文本中删除所有非打印字符。
    
- **类别**: 文本
    
- **语法**: `=CLEAN(text)`
    
- **示例**: `=CLEAN("Hello" & CHAR(13) & "World")` 返回“HelloWorld”。
    
- **适用版本**: Excel 97及以上
    

#### 81. EXACT

- **用途**: 检查两个文本字符串是否完全相同，包括大小写。
    
- **类别**: 文本
    
- **语法**: `=EXACT(text1, text2)`
    
- **示例**: `=EXACT("Excel", "excel")` 返回FALSE。
    
- **适用版本**: Excel 97及以上
    

#### 82. REPT

- **用途**: 重复指定次数的文本字符串。
    
- **类别**: 文本
    
- **语法**: `=REPT(text, number_times)`
    
- **示例**: `=REPT("Excel", 3)` 返回“ExcelExcelExcel”。
    
- **适用版本**: Excel 97及以上
    

#### 83. SUBSTITUTE

- **用途**: 用新文本替换文本字符串中的现有文本。
    
- **类别**: 文本
    
- **语法**: `=SUBSTITUTE(text, old_text, new_text, [instance_num])`
    
- **示例**: `=SUBSTITUTE("ExcelScissor", "Scissor", "Tool")` 返回“ExcelTool”。
    
- **适用版本**: Excel 97及以上
    

#### 84. T

- **用途**: 返回值的文本；如果值不是文本，返回空字符串。
    
- **类别**: 文本
    
- **语法**: `=T(value)`
    
- **示例**: `=T(A1)` 返回A1中的文本，如果A1是文本，否则返回空字符串，假设A1包含数据。
    
- **适用版本**: Excel 2000及以上
    

#### 85. N

- **用途**: 将值转换为数字；如果值无法转换，返回0。
    
- **类别**: 逻辑
    
- **语法**: `=N(value)`
    
- **示例**: `=N("123")` 返回123；`=N("Excel")` 返回0。
    
- **适用版本**: Excel 2000及以上
    

#### 86. DB

- **用途**: 使用固定余额递减法计算资产某一期间的折旧值。
    
- **类别**: 财务
    
- **语法**: `=DB(cost, salvage, life, period, [month])`
    
- **示例**: `=DB(10000, 1000, 5, 1)` 计算第一期的折旧值，假设成本为10000，残值为1000，折旧年限为5年。
    
- **适用版本**: Excel 97及以上
    

#### 87. DDB

- **用途**: 使用双倍余额递减法或其他指定方法计算资产某一期间的折旧值。
    
- **类别**: 财务
    
- **语法**: `=DDB(cost, salvage, life, period, [factor])`
    
- **示例**: `=DDB(10000, 1000, 5, 1, 2)` 计算第一期的折旧值，使用双倍余额递减法，假设成本为10000，残值为1000，折旧年限为5年。
    
- **适用版本**: Excel 97及以上
    

#### 88. SLN

- **用途**: 计算资产某一期间的直线折旧值。
    
- **类别**: 财务
    
- **语法**: `=SLN(cost, salvage, life)`
    
- **示例**: `=SLN(10000, 1000, 5)` 返回每期的直线折旧值，假设成本为10000，残值为1000，折旧年限为5年。
    
- **适用版本**: Excel 97及以上
    

#### 89. SYD

- **用途**: 计算资产某一期间的年数总和折旧值。
    
- **类别**: 财务
    
- **语法**: `=SYD(cost, salvage, life, period)`
    
- **示例**: `=SYD(10000, 1000, 5, 1)` 计算第一期的年数总和折旧值，假设成本为10000，残值为1000，折旧年限为5年。
    
- **适用版本**: Excel 97及以上
    

#### 90. PMT

- **用途**: 根据恒定利率和恒定付款额计算贷款的每期付款额。
    
- **类别**: 财务
    
- **语法**: `=PMT(rate, nper, pv, [fv], [type])`
    
- **示例**: `=PMT(5%/12, 60, 10000)` 计算5年期10,000美元贷款的每月还款额，年利率5%。
    
- **适用版本**: Excel 97及以上
    

#### 91. IPMT

- **用途**: 计算投资在指定期间的利息支付额。
    
- **类别**: 财务
    
- **语法**: `=IPMT(rate, per, nper, pv, [fv], [type])`
    
- **示例**: `=IPMT(5%/12, 1, 60, 10000)` 计算5年期10,000美元贷款第一月的利息支付额，年利率5%。
    
- **适用版本**: Excel 2000及以上
    

#### 92. PPMT

- **用途**: 计算投资在指定期间的本金支付额。
    
- **类别**: 财务
    
- **语法**: `=PPMT(rate, per, nper, pv, [fv], [type])`
    
- **示例**: `=PPMT(5%/12, 1, 60, 10000)` 计算5年期10,000美元贷款第一月的本金支付额，年利率5%。
    
- **适用版本**: Excel 2000及以上
    

#### 93. FV

- **用途**: 根据恒定利率和恒定付款额计算投资的未来值。
    
- **类别**: 财务
    
- **语法**: `=FV(rate, nper, pmt, [pv], [type])`
    
- **示例**: `=FV(5%, 10, -100, -1000)` 计算10年期投资的未来值，初始支付1,000美元，每月支付100美元，年利率5%。
    
- **适用版本**: Excel 97及以上
    

#### 94. PV

- **用途**: 根据恒定利率和恒定付款额计算投资的现值。
    
- **类别**: 财务
    
- **语法**: `=PV(rate, nper, pmt, [fv], [type])`
    
- **示例**: `=PV(5%, 10, -100, 0, 0)` 计算10年期投资的现值，每月支付100美元，年利率5%。
    
- **适用版本**: Excel 97及以上
    

#### 95. NPV

- **用途**: 根据一系列未来支付和收入计算投资的净现值。
    
- **类别**: 财务
    
- **语法**: `=NPV(rate, value1, [value2], ...)`
    
- **示例**: `=NPV(5%, -1000, 200, 300, 400, 500)` 计算投资的净现值，假设初始投资为-1000，后续各期现金流为200, 300, 400, 500。
    
- **适用版本**: Excel 97及以上
    

#### 96. IRR

- **用途**: 计算一系列现金流的内部收益率。
    
- **类别**: 财务
    
- **语法**: `=IRR(values, [guess])`
    
- **示例**: `=IRR(A1:A10)` 计算A1:A10 中现金流的内部收益率，假设A1:A10 包含现金流数据。
    
- **适用版本**: Excel 97及以上
    

#### 97. RATE

- **用途**: 计算年金的每期利率。
    
- **类别**: 财务
    
- **语法**: `=RATE(nper, pmt, pv, [fv], [type], [guess])`
    
- **示例**: `=RATE(120, -200, 20000)` 计算20,000美元贷款的月利率，每月还款200美元，期限10年。
    
- **适用版本**: Excel 97及以上
    

#### 98. ACCRINT

- **用途**: 计算支付定期利息的证券的应计利息。
    
- **类别**: 财务
    
- **语法**: `=ACCRINT(issue, first_interest, settlement, rate, par, frequency, [basis], [calc_method])`
    
- **示例**: `=ACCRINT("1/1/2023", "7/1/2023", "4/15/2023", 5%, 1000, 2, 0, 0)` 计算债券的应计利息，假设发行日为1/1/2023，首次付息日为7/1/2023，结算日为4/15/2023，利率5%，面值1000，每年付息2次。
    
- **适用版本**: Excel 2003及以上
    

#### 99. COUPON

- **用途**: 计算结算日之后的下一个付息日。
    
- **类别**: 财务
    
- **语法**: `=COUPON(settlement, maturity, frequency, [basis])`
    
- **示例**: `=COUPON("1/1/2023", "1/1/2025", 2, 0)` 返回下一个付息日，假设结算日为1/1/2023，到期日为1/1/2025，每年付息2次。
    
- **适用版本**: Excel 2003及以上
    

#### 100. YIELD

- **用途**: 计算支付定期利息的证券的收益率。
    
- **类别**: 财务
    
- **语法**: `=YIELD(settlement, maturity, rate, pr, redemption, frequency, [basis])`
    
- **示例**: `=YIELD("1/1/2023", "1/1/2025", 5%, 95, 100, 2, 0)` 计算债券的收益率，假设结算日为1/1/2023，到期日为1/1/2025，利率5%，价格95，面值100，每年付息2次。
    
- **适用版本**: Excel 2003及以上
    

### 补充常用公式

以下是一些常用的Excel公式，可能未包含在原始的100个公式中：

#### 101. XLOOKUP

- **用途**: 在范围中查找值，并返回相应的结果，支持模糊匹配和多条件匹配。
    
- **类别**: 查找与引用
    
- **语法**: `=XLOOKUP(lookup_value, lookup_array, result_array, [if_not_found], [match_mode], [search_mode])`
    
- **示例**: `=XLOOKUP(A1, B1:B10, C1:C10, "未找到", 2)` 在B1:B10 中模糊查找A1，并返回C1:C10 中的对应值。
    
- **适用版本**: Excel 365, Excel 2019及以上
    

#### 102. FILTER

- **用途**: 根据条件过滤数据范围。
    
- **类别**: 查找与引用
    
- **语法**: `=FILTER(array, include, [if_empty])`
    
- **示例**: `=FILTER(A1:C10, A1:A10>50, "无数据")` 过滤A1:C10 中A列大于50的行。
    
- **适用版本**: Excel 365, Excel 2021及以上
    

#### 103. SORT

- **用途**: 对数据范围进行排序。
    
- **类别**: 查找与引用
    
- **语法**: `=SORT(array, [sort_index], [sort_order], [by_col])`
    
- **示例**: `=SORT(A1:C10, 2, TRUE)` 按第2列升序排序A1:C10 。
    
- **适用版本**: Excel 365, Excel 2021及以上
    

#### 104. SEQUENCE

- **用途**: 生成一个数字序列。
    
- **类别**: 数字
    
- **语法**: `=SEQUENCE(rows, [columns], [start], [step])`
    
- **示例**: `=SEQUENCE(5, 1, 10, 5)` 生成从10开始，每次增加5，共5行的序列。
    
- **适用版本**: Excel 365, Excel 2021及以上
    

#### 105. TEXTJOIN

- **用途**: 将多个文本字符串连接在一起，并可指定分隔符。
    
- **类别**: 文本
    
- **语法**: `=TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)`
    
- **示例**: `=TEXTJOIN(", ", TRUE, A1:A10)` 连接A1:A10 中的非空单元格，用逗号和空格分隔。
    
- **适用版本**: Excel 2016及以上
    

#### 106. IFS

- **用途**: 检查多个条件，并返回与第一个满足条件对应的值。
    
- **类别**: 逻辑
    
- **语法**: `=IFS(condition1, value1, [condition2, value2], ...)`
    
- **示例**: `=IFS(A1>90, "A", A1>80, "B", A1>70, "C")` 根据A1的值返回相应的等级。
    
- **适用版本**: Excel 2016及以上
    

#### 107. SWITCH

- **用途**: 检查表达式与多个可能值，并返回相应的结果。
    
- **类别**: 逻辑
    
- **语法**: `=SWITCH(expression, value1, result1, [value2, result2], ..., [default])`
    
- **示例**: `=SWITCH(A1, "苹果", "水果", "胡萝卜", "蔬菜", "其他")` 根据A1的值返回相应的类别。
    
- **适用版本**: Excel 2016及以上
    

#### 108. CONCAT

- **用途**: 将多个文本字符串连接在一起。
    
- **类别**: 文本
    
- **语法**: `=CONCAT(text1, [text2], ...)`
    
- **示例**: `=CONCAT("Excel", "Scissor")` 返回"ExcelScissor"。
    
- **适用版本**: Excel 2016及以上
    

#### 109. DATEDIF

- **用途**: 计算两个日期之间的差值，以指定的单位表示。
    
- **类别**: 日期与时间
    
- **语法**: `=DATEDIF(start_date, end_date, unit)`
    
- **示例**: `=DATEDIF(A1, B1, "Y")` 计算A1和B1之间的年数。
    
- **适用版本**: Excel 2000及以上
    

#### 110. EDATE

- **用途**: 返回某个日期加上指定月数后的日期。
    
- **类别**: 日期与时间
    
- **语法**: `=EDATE(start_date, months)`
    
- **示例**: `=EDATE(A1, 6)` 返回A1日期加上6个月后的日期。
    
- **适用版本**: Excel 2003及以上
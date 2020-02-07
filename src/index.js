/*
 * @Author: Gavrain
 * @Date: 2020-02-07 19:57:31
 * @LastEditors  : Gavrain
 * @LastEditTime : 2020-02-07 22:01:30
 * @no item name: \randomquiz\index.js
 */
let XLSX = require('xlsx')
let fs = require('fs')
let path = require('path')

// 同步读取
let config = JSON.parse(fs.readFileSync('./config.json').toString())
let limit = config.limit
let row = config.row
let col = config.col
let rand = Math.random
let round = Math.round
let utils = XLSX.utils

function gRow() {
	let arr = new Array()
	let i = 0
	while (i < col) {
		sign = rand() > 0.5 ? '+' : '-'
		n1 = round(rand() * limit)
		n2 = round(rand() * (sign == '+' ? 20 - n1 : n1))
		arr.push(`${n1}${sign}${n2}=`)
		i++
	}
	return arr
}

let matrix = new Array()
let i = 0
while (i < row) {
	matrix.push(gRow())
	i++
}

try {
	var workbook = XLSX.readFile(path.join(__dirname, 'quiz.xlsx'))
} catch (error) {
	workbook = utils.book_new()
}
/* DO SOMETHING WITH workbook HERE */
utils.book_append_sheet(workbook, utils.aoa_to_sheet(matrix))
XLSX.writeFile(workbook, path.join(__dirname, 'quiz.xlsx'))
console.log(workbook.Sheets)
/* at this point, out.xlsb is a file that you can distribute */

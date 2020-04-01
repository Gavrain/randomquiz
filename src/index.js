/*
 * @Author: Gavrain
 * @Date: 2020-02-07 19:57:31
 * @LastEditors  : Gavrain
 * @LastEditTime : 2020-02-08 16:49:23
 * @no item name: \randomquiz\index.js
 */
let fs = require('fs')

let config = JSON.parse(fs.readFileSync('./config.json').toString())
// 同步读取

function getRandomQuiz(config) {
  let XLSX = require('xlsx')
  let utils = XLSX.utils
  let path = require('path')

  let { row, col } = config

  function gFormula({ lower = 0, upper, numberCount }) {
    let { random } = require('lodash')
    let formula = []

    for (let i = 0; i < numberCount; i++) {
      let num = random(lower, upper)
      lower -= num
      upper -= num
      if (i == 0) {
        formula.push(num)
        continue
      }
      formula.push(num < 0 ? num : `+${num}`)
    }
    return formula.join('')
  }

  function gMatrix({ col, row, upper, numberCount }) {
    let matrix = []
    for (let i = 0; i < row; i++) {
      let arr = []
      for (let j = 0; j < col; j++) {
        arr.push(gFormula({ upper, numberCount }))
      }
      matrix.push(arr)
    }
    return matrix
  }

  let matrix = gMatrix(config)

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
}

getRandomQuiz(config)

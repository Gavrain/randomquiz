/*
 * @Author: Gavrain
 * @Date: 2020-02-07 22:07:33
 * @LastEditors  : Gavrain
 * @LastEditTime : 2020-02-07 22:32:07
 * @no item name: \randomquiz\webpack.config.js
 */
const path = require('path')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'quiz.js',
		path: path.resolve(__dirname, 'dist'),
	},
	target: 'node',
}

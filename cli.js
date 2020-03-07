#!/usr/bin/env node 
const program = require('commander');
const api = require('./index.js')
const pkg = require('./package.json')
// 设置它的选项
program
.version(pkg.version)
program
.option('-x, --xxx', 'what the x')

// 设置子命令
program
  .command('add <taskName>')
  .description('add a task')
  .action((firstArg,info) => {
      let words = info.parent.args;
      api.add(words[0]).then(()=>{console.log("添加成功")},()=>{console.log("添加失败")})
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
      api.clear().then(()=>{console.log("清除完毕")},()=>{console.log("清除失败")})
  });


program.parse(process.argv);

// 用户实际输入的 命令参数
// console.log(process.argv)

if(process.argv.length === 2){
  // 说明用户直接运行 node cli.js
  api.showAll()
}
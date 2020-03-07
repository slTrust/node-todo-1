const program = require('commander');

// 设置它的选项
program
.option('-x, --xxx', 'what the x')

// 设置子命令
program
  .command('add <taskName>')
  .description('add a task')
  .action((firstArg,info) => {
      let args = info.parent.args;
      console.log(args);
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
      console.log('this is clear');
  });


program.parse(process.argv);


const inquirer = require('inquirer');
const db = require('./db.js');

module.exports.add = async (title) =>{
    // 读取之前的任务
    const list = await db.read();
    // 往里面添加一个任务
    list.push({title,done:false});
    // 存储任务到文件
    console.log('read~~~~')
    console.log(list)
    await db.write(list);
}

module.exports.clear = async (title) =>{
    await db.write([]);
}

module.exports.showAll = async (title) =>{
    const list = await db.read();
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'index',
                message: '请选择你想操作的任务',
                choices: [ 
                    {name:'退出',value:'-1'},
                  
                    ...list.map((task, index)=>{
                    return {name: `${task.done ? '[x]' : '[_]'}${index} - ${task.title}`, value: index.toString()}
                }),
                {name:'创建任务',value:'-2'}
            ]
            },
        ])
        .then(answers => {
            const index = parseInt(answers.index);
            if(index >= 0){
                inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'action',
                        message: '请选择操作',
                        choices: [ 
                            {name:'退出',value:'quit'},
                            {name:'已完成',value:'makeAsDone'},
                            {name:'未完成',value:'maksAsUndone'},
                            {name:'改标题',value:'updateTitle'},
                            {name:'删除',value:'remove'},
                        ]
                    },
                ])
                .then(answers2 => {
                    switch(answers2.action){
                        case 'makeAsDone':
                            list[index].done = true;
                            db.write(list);
                            break;
                        case 'maksAsUndone':
                            list[index].done = false;
                            db.write(list);
                            break;
                        case 'updateTitle':
                            inquirer.prompt([
                                {type: 'input',
                                name: 'title',
                                message:'新的标题',
                                default: list[index].title
                            }]).then(answer => {
                                list[index].title = answer.title
                                db.write(list)
                              });
                            break;
                        case 'remove':
                            list.splice(index,1);
                            db.write(list);
                            break;
                    }
                });
            }else if( index === -2){
                // 创建任务
                inquirer.prompt([
                    {type: 'input',
                    name: 'title',
                    message:'输入任务标题'
                }]).then(answer => {
                    list.push({
                        title: answer.title,
                        done: false
                    })
                    db.write(list);
                  });
            }
        });
}


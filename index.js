const homedir = require('os').homedir()
const home = process.env.HOME || homedir;
// 专门用来拼路径的 windows 是 \  mac 是 /
const p = require('path');
const dbPath = p.join(home,'.todo');
const fs = require('fs');

module.exports.add = (title)=>{
    // 读取之前的任务
    fs.readFile(dbPath,{flag:'a+'},(error,data)=>{
        if(error){
            console.log(error)
        }else{
            let list;
            try{
                list = JSON.parse(data.toString())
            }catch(error2){
                list = []
            }
            const task = {
                title: title,
                done: false
            }
            list.push(task);
            const string = JSON.stringify(list);
            fs.writeFile(dbPath,string + "\n",(error3)=>{
                if(error3){
                    console.log(error3)
                }
            });
            console.log(list)
        }
    });
    // 往里面添加一个任务
    // 存储任务到文件

}
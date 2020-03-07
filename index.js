const homedir = require('os').homedir()
const home = process.env.HOME || homedir;
module.exports.add = (title)=>{
    console.log('add ' + title);
    console.log(home)
}
// 声明是 fs的 jest 的假模块
const fs = jest.genMockFromModule('fs');
const _fs = jest.requireActual('fs');

Object.assign(fs,_fs);

let readMocks = {};

fs.setReadFileMock = (path, error, data)=>{
    readMocks[path] = [error,data];
}

// 覆盖 fs的 readFile()
fs.readFile = (path, options, callBack) => {
    // 如果你 fs.readFile('xxx',fn) 代表第二个参数是 callBack
    if(callBack === undefined){
        callBack = options
    }

    if(path in readMocks){
        callBack(...readMocks[path])
    }else{
        _fs.readFile(path, options, callBack)
    }
}

let writeMocks = {}

fs.setWriteFileMock = (path, fn)=>{
    writeMocks[path] = fn;
}

fs.writeFile = (path,data,options, callBack) => {
    if(callBack === undefined){
        callBack = options;
    }
    if(path in writeMocks){
        writeMocks[path](path, data, options, callBack)
    }else{
        _fs.writeFile(path, data, options, callBack)
    }

}

fs.clearMocks = ()=>{
    readMocks = {};
    writeMocks = {};
}

module.exports = fs;
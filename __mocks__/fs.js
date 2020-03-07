// 声明是 fs的 jest 的假模块
const fs = jest.genMockFromModule('fs');

fs.x = ()=>{
    console.log('hi')
    return 'xxx';
}

module.exports = fs;
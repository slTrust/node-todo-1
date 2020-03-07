const db = require("../db.js")
const fs = require('fs');
jest.mock('fs');

describe("db", () => {
    afterEach(() => {
        // 每个it 执行之后
        fs.clearMocks();
    })
    it("can read", async () => {
        const data = [{ title: "hi", done: true }]
        fs.setReadFileMock('/xxx', null, JSON.stringify(data));
        const list = await db.read('/xxx');
        expect(list).toStrictEqual(data)
    })

    it("can wriete", async () => {
        let fakeFile;
        fs.setWriteFileMock('/yyy', (path, data, options, callBack) => {
            fakeFile = data;
            callBack(null)
        })
        const list = [{ title: "见欧阳娜娜", done: true }, { title: "见迪丽热巴", done: true }]
        await db.write(list, '/yyy');
        expect(fakeFile).toBe(JSON.stringify(list) + "\n");
    })
})
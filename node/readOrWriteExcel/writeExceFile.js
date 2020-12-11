const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

function test() {
    const data = [
        {
            name: 'sheet1',
            data: [
                ['ID', 'Name', 'Score'],
                ['1', 'Michael', '99'],
                ['2', 'Jordan', '98'],
            ],
        },
        {
            name: 'sheet2',
            data: [
                ['AA', 'BB'],
                ['23', '24'],
            ],
        },
    ];
    const buffer = xlsx.build(data);

    // 写入文件
    fs.writeFile('a.xlsx', buffer, function (err) {
        if (err) {
            console.log('Write failed: ' + err);
            return;
        }

        console.log('Write completed.');
    });
}


function writeExcelFile() {
    const content = fs.readFileSync(path.resolve(__dirname, './auth.js'));
    const sheetData = [
        {
            name: 'sheet1',
            data: [
                ['权限名', '前端权限代码', '权限码', '前端是否使用']
            ]
        }
    ]
    let reg1 = /\/\//;
    let reg2 = /\/\/\s?(.*)\n\s+(.*)\:\s+(\d+)/;
    let reg3 = /(.*)\n\s+(.*)\:\s+(\d+)/;
    const arr = content.toString().split(',');
    let shouldDelete = false;
    let authName;
    arr.forEach((item) => {
        if (reg1.test(item)) {
            const matches = item.match(reg2);
            if (matches) {
                authName = matches[1];
                let feAuthName = matches[2];
                let authCode = matches[3];
                let isValid = '是';
                if (authName.includes('-delete')) {
                    isValid = '否';
                    authName = authName.replace('-delete', '');
                    shouldDelete = true;
                } else {
                    shouldDelete = false;
                }
                let data = [authName, feAuthName, authCode, isValid]
                sheetData[0].data.push(data);
            }
        } else {
            const matches = item.match(reg3);
            if (matches) {
                let feAuthName = matches[2];
                let authCode = matches[3];
                let isValid = shouldDelete ? '否' : '是';
                let data = [authName, feAuthName, authCode, isValid]
                sheetData[0].data.push(data);
            }
        }
    });
    const buffer = xlsx.build(sheetData);

    // 写入文件
    fs.writeFile('auth.xlsx', buffer, function (err) {
        if (err) {
            console.log('Write failed: ' + err);
            return;
        }

        console.log('Write completed.');
    });
}

writeExcelFile()
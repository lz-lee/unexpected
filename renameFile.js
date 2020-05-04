const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, './src');

const dirsPath = [targetDir];

while (dirsPath.length > 0) {
    const dir = dirsPath.pop();
    const dirents = fs.readdirSync(dir, { withFileTypes: true });

    for (const dirent of dirents) {
        if (dirent.isDirectory()) {
            dirsPath.push(path.join(dir, dirent.name));
        } else {
            const filePath = path.join(dir, dirent.name);
            if (path.extname(filePath) === '.xml') {
                fs.renameSync(filePath, path.join(path.dirname(filePath), `${path.basename(filePath, '.xml')}.tm`));
            }
        }
    }
}

// var.less to tsx
const reg = /-[a-z]|-\d/g;
const dir = path.join(__dirname, './var.less');
const target = path.join(__dirname, './varStyle.tsx');

function lessToTsx() {
    const str = fs.readFileSync(dir).toString();
    let strEmpty = '';
    let compile = '\nexport const varStyle = {';
    str.split(';').filter(v => v).forEach(v => {
        const [key, value] = v.split(':');
        if (key && value) {
            let newKey = key.replace('@', '').replace(reg, function(match) {
                return match.replace('-', '').toUpperCase();
            }).trim();
            if (value.indexOf('@') < 0) {
                let constComplie = 'export const ';
                constComplie += `${newKey} = '${value.trim()}';`;
                strEmpty += `${constComplie}\n`;
            } else  {

                let newValue =  value.split(' ').map(v => {
                    let t = v.replace('@', '').replace(reg, function(match) {
                        return match.replace('-', '').toUpperCase();
                    });
                    return t
                }).join('');
                compile += `\n${newKey}:${newValue},`
            }
        }
    });
    compile += '}';
    const finallyStr  = strEmpty  + compile;
    fs.writeFileSync(target, finallyStr);
}

lessToTsx();
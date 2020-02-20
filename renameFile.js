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

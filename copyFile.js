const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const COMPONENT_TSX = ejs.compile(fs.readFileSync(path.join(__dirname, 'component.tsx.ejs')).toString());

function copyFile() {
    const tsFiles = fs.readdirSync('./icons');
    for (const tsFile of tsFiles) {
        const filename = path.parse(tsFile).name;
        console.log(filename);
        const compiled = COMPONENT_TSX({
            componentName: filename,
        });
        fs.writeFileSync(`./src/React/Ui/Icons/${filename}.tsx`, compiled);
    }
}

copyFile();

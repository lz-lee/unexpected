const fs = require('fs');
const path = require('path');

const pathName = './src/containers';

function delteFile() {
  const tsFiles = fs.readdirSync(pathName);
  for (const tsFile of tsFiles) {
    if (fs.existsSync(path.join(pathName, tsFile, 'Loadable.tsx'))) {
      const fPath = path.resolve(__dirname, path.join(pathName, tsFile, 'Loadable.tsx'));
      console.log('dir is >>>>>>>>>>>', fPath)
      fs.unlinkSync(fPath);
    }
  }
}

delteFile()
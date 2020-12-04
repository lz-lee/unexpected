const xlsx = require('node-xlsx');
const fs = require('fs');

function readExcelFile() {
  // Parse a buffer
  const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`./excelFile.xlsx`));
  // console.log(workSheetsFromBuffer)
  // Parse a file
  const workSheetsFromFile = xlsx.parse(`./excelFile.xlsx`);
  const result = [];

  for (const [index, data] of Object.entries(workSheetsFromFile[1].data)) {
    if (index === '0') {
      continue;
    }
    const item = {
      systemName: data[0],
      functionGuidelines: data[1],
      netFunctions: data[2].trimRight(),
      url: data[3],
      applyMehtod: data[4] || '-',
      icon: 'system.svg'
    }
    result.push(item);
  }
  console.log(JSON.stringify(result))
}

readExcelFile();
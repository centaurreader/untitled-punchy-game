const fs = require('fs');
const parseSync = require('csv-parse/lib/sync');
const path = require('path');
const yargs = require('yargs');

function parseCsv(csv) {
  return parseSync(
    csv,
    {
      delimiter: ',',
    }
  );
}

function csvToObjects(parsedCsv) {
  const schema = parsedCsv[0];
  const records = parsedCsv.slice(1, parsedCsv.length - 1);
  return records.map((record) => schema.reduce((result, property, i) => ({
    ...result,
    [property]: record[i],
  }), {}));
}

function writeJsonOutput(objects) {
  const json = JSON.stringify(objects);
  const data = new Uint8Array(Buffer.from(json));
  fs.writeFileSync(path.resolve('.', 'resource.json'), data);
  console.log('Wrote resource.json');
}

function buildFile(filePathArray) {
  const result = filePathArray.reduce((result, filePath) => {
    const filename = path.basename(filePath);
    const file = fs.readFileSync(path.resolve(filePath)).toString();
    const parsedCsv = parseCsv(file);
    const objects = csvToObjects(parsedCsv);
    return {
      ...result,
      [filename]: objects,
    };
  }, {});
  writeJsonOutput(result);
}

module.exports = {
  buildFile,
};


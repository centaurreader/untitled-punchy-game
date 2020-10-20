const fs = require('fs');
const parseSync = require('csv-parse/lib/sync');
const path = require('path');
const yargs = require('yargs');
const { nanoid, } = require('nanoid');

function parseCsv(csv) {
  return parseSync(
    csv,
    {
      delimiter: ',',
      skip_empty_lines: true,
    }
  );
}

function parsePropertyValue(value) {
  return value
    ? value.split('').includes('|')
      ? value.split('|')
      : value
    : null;
}

function csvToObjects(parsedCsv) {
  const schema = parsedCsv[0];
  const records = parsedCsv.slice(1, parsedCsv.length);
  return records.map((record) => schema.reduce((result, property, i) => ({
    id: nanoid(),
    ...result,
    ...(property.startsWith('property-')
      ? { properties: [
            ...(result.properties || []),
            {
              name: property.replace('property-', ''),
              value: parsePropertyValue(record[i]),
              id: nanoid(),
            }, 
          ],
        }
      : { [property]: parsePropertyValue(record[i]), }),
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
    const file = fs.readFileSync(path.resolve(filePath));
    const parsedCsv = parseCsv(file);
    const objects = csvToObjects(parsedCsv);
    return [
      ...result,
      {
        type: null,
        name: filename,
        components: objects,
        id: nanoid(),
      },
    ];
  }, []);
  writeJsonOutput({
    type: 'Box',
    name: null,
    componentGroups: result,
  });
}

module.exports = {
  buildFile,
};


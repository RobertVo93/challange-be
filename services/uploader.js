const path = require('path')
const fu = require('../utils/file')
const fs = require('fs');

const uploadFile = async (host, objects) => {
  const { realNumberList, alphabeticalList, integerList, alphaNumericList, content } = objects;
  const directory = path.join(process.cwd(), 'uploads')
  await fu.ensureDirectory(directory);
  const name = fu.randomUUID() + '.txt';
  const destination = path.join(directory, name);
  fs.writeFile(destination, content, function (err) {
    if (err) return console.log(err);
  });

  return {
    realNumberList,
    alphabeticalList,
    integerList,
    alphaNumericList,
    name,
    path: destination.replace(process.cwd(), ''),
    raw: `${host}/uploads/${name}`,
    href: `uploads/${name}`
  };
}

module.exports = { uploadFile }

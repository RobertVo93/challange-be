const path = require('path')
const fs = require('fs')

const exists = path => new Promise(resolve => fs.access(path, fs.constants.F_OK, e => resolve(!e)))

const ensureDirectory = async (directory) => {
  if (!await exists(directory)) {
    await fs.promises.mkdir(directory)
  }
}

const randomUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = {
  ensureDirectory,
  exists,
  randomUUID
}

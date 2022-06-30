const fs = require('fs');
const path = require('path');

function getTempFolder() {
    const _path = __dirname + '/temp/'
    try {
        fs.accessSync(_path);
    } catch (err) {
        fs.mkdirSync(_path);
    }
    return _path
}

function cleanTempFolder() {
    const tempFolder = getTempFolder();
    fs.readdir(tempFolder, (error, files) => {
        console.log('Start cleaning temp folder.')
        if (error) throw new Error('Unable read temp folder.');

        for (const file of files) {
            fs.rmSync(path.join(tempFolder, file), {recursive: true, force: true})
        }
        console.log('Temp folder was cleaned.')
    })
}

module.exports = {getTempFolder, cleanTempFolder};
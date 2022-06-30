const fs = require("fs");
const path = require('path')
const sharp = require("sharp");
const router = require('express').Router();
const createError = require('http-errors');
const {getTempFolder} = require('./utls');

router.post('/image-service/webp/', (request, response, next) => {
    request.pipe(request.busboy);
    request.busboy.on('file', (field, file, {filename}) => {

        if (field != 'file') return;

        fs.mkdtemp(path.join(getTempFolder(), 'result-'), (err, folder) => {
            if (err) {
                return next(createError(500));
            }

            const inputPath = path.join(folder, filename);
            const fStream = fs.createWriteStream(inputPath);
            file.pipe(fStream);
            fStream.on('close', async () => {
                const webp = await sharp(inputPath).webp();
                filename = await filename.replace('.png', '.webp');
                const outPath = path.join(folder, filename);
                await webp.toFile(outPath);

                await fs.unlink(inputPath, (err) => {
                    if (err) return console.log(err);
                });

                if (request.header('Get-File') === 'true') {
                    return response.sendFile(outPath);
                }

                let responseFolder = folder.split('/');
                responseFolder = responseFolder[responseFolder.length - 1];
                response.setHeader('Content-Type', 'application/json');
                return response.send(JSON.stringify({folder: responseFolder, filename}));
            });
        });
    });
});

router.get('/image-service/webp/:folderName/:fileName', (request, response, next) => {
    let folder = request.params.folderName;
    let fileName = request.params.fileName;

    if (!folder || !fileName) {
        return next(createError(500));
    }

    let filePath = path.join(getTempFolder(), 'temp', folder, fileName);
    fs.access(filePath, (err) => {
        if (err) return next(createError(404));
        return response.sendFile(filePath);
    })
})

module.exports = router;
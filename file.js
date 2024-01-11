const fs = require('fs');
const path = require('path');

const target = 'C:\\Users\\11032\\Pictures\\Saved Pictures';

function forEachDir(dir, cb) {

    fs.readdir(dir, (err, files) => {
        files.forEach(filename => {
            const filePath = path.resolve(dir, filename);
            fs.stat(filePath, (err, stats) => {
                if (stats.isDirectory()) {
                    forEachDir(filePath, cb);
                } else if (stats.isFile()) {
                    typeof cb === 'function' && cb(filePath, dir, filename);
                }
            })
        })
    })
}

// const images = require('images');
// function minimizeImages(targetDir) {
//     const saveDir = 'C:\\Users\\11032\\Pictures\\Saved Pictures';
//     let i = 19;
//     forEachDir(targetDir, imagePath => {
//         // const outName = path.resolve(saveDir, 'p' + i++ + '.' + imagePath.split('.').pop());
//         const outName = path.resolve(__dirname, 'images', 'p' + i++ + '.' + imagePath.split('.').pop());
//         console.log(outName);
//         try {
//             fs.readFile(imagePath, (err, data) => {
//                 images(data).save(outName, { quality: 50 });
//             })
//         } catch (err) {
//             console.error(err);
//         }
//         console.log(2222)
//     })
// };
// console.log(1)

// setInterval(() => {
//     console.log(1)
// }, 1000)
// minimizeImages('C:\\Users\\11032\\Pictures\\original');

let index = 0;
forEachDir('C:\\Users\\11032\\Pictures\\original', (filepath, dir, filename) => {
    fs.renameSync(filepath, path.resolve(dir, `img_${index++}.${filename.split('.').pop()}`));
})

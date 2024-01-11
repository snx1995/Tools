import { readFile } from 'fs';

readFile('./file.js', (err, data) => {
    console.log(typeof data)
})
import multer from 'multer';
import fs from 'fs';
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
import { __dirname, __join } from '../../dirname.js';

// const __dirname = dirname(fileURLToPath(import.meta.url));
const dirStorage = __join(__dirname, './api/storage');
const dirPublic = __join(__dirname, '../public/img');

export const saveFile = (file) => {
    const newPath = `${dirPublic}/${file.originalname}`;
    // console.log('Path', file.path)
    // console.log('Path nuevo', newPath)
    fs.renameSync(file.path, newPath)
}

const uploadMiddleware = multer( { dest: dirStorage } )


export default uploadMiddleware
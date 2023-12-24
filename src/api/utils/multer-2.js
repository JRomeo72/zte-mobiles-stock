import multer from 'multer';
import fs from 'fs';
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
import { __dirname, __join } from '../../dirname.js';

// const __dirname = dirname(fileURLToPath(import.meta.url));
const dirStorage = __join(__dirname, './api/storage');
const dirPublic = __join(__dirname, '../public/img');

export const saveFile = (file, nombre) => {
    let formatName = nombre.split(" ").join("-").toLowerCase();
    let ext = file.originalname.split(".").pop();
    let newName = `${formatName}.${ext}`
    const newPath = `${dirPublic}/${newName}`;

    fs.renameSync(file.path, newPath);

    return newName
}

const uploadMiddleware = multer( { dest: dirStorage } )


export default uploadMiddleware
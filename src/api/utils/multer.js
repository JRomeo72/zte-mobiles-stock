import multer from 'multer';
import fs from 'fs';
import { __dirname, __join } from '../../dirname.js';

const dirStorage = __join(__dirname, './api/storage');

export const saveFile = (file, nombre) => {
    let formatName = nombre.split(" ").join("-").toLowerCase();
    let ext = file.originalname.split(".").pop();
    let newName = `${formatName}.${ext}`;
    let newPath = `${file.destination}/${newName}`;

    fs.renameSync(file.path, newPath);

    return newPath
}

const uploadMiddleware = multer( { dest: dirStorage } )


export default uploadMiddleware
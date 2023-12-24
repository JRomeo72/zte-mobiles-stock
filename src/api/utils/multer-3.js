import multer from 'multer';
import { __dirname, __join } from '../../dirname.js';

const dirStorage = __join(__dirname, './api/storage');

const uploadMiddleware = multer( { dest: dirStorage } )


export default uploadMiddleware
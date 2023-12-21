import multer from 'multer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: function( req, file, cb ) {
        const pathStorage = join(__dirname, '../storage');
        cb(null, pathStorage)

    },
    filename: function( req, file, cb ) {
        const { filename } = req.params;
        const ext = file.originalname.split('.').pop;
        const filenameGenerated = `${filename}.${ext}`;
        cb(null, filenameGenerated)
    }
});

const uploadMiddleware = multer( { storage: storage } );

// const uploadMiddleware = (file) => {
//     filename = file
//     const uploadStorage = multer( { storage: storage } );
//     return uploadStorage
// }

export default uploadMiddleware
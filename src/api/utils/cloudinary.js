import {v2 as cloudinary} from 'cloudinary';

const uploadImageCloud = async (pathFile) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })

    const response = await cloudinary.uploader.upload(pathFile, { folder: 'mobiles' });

    return response
};

export default uploadImageCloud
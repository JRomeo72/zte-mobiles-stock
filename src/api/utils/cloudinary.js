import {v2 as cloudinary} from 'cloudinary';

export const uploadImageCloud = async (pathFile) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const response = await cloudinary.uploader.upload(pathFile, { folder: 'mobiles' });

    return response
};

export const deleteImageCloud = async (publicId) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const response = await cloudinary.uploader.destroy(publicId);

    return response    

}
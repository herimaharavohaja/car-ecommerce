import multer from "multer";
import path from "path";
import fs from 'fs';
import { promises as fsPromises, existsSync } from 'fs';

const { unlink } = fsPromises;

const publicPath = path.join(__dirname, '../../public');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, publicPath);
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        callback(null, file.fieldname + '-' + uniqueSuffix);
    }
});

export const deleteImage = async (imageName: string) => {
    try {
        const imagePath = path.join(__dirname, '../../public', imageName);

        if (existsSync(imagePath)) {
            await unlink(imagePath);
        } 
    } catch (error) {
        console.error(`Error deleting image ${imageName}:`, error);
        throw error;
    }
};

export default multer({ storage: storage });

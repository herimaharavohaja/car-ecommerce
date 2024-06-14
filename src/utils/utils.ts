import bcrypt from 'bcrypt';
import { deleteImage } from '../files/upload';
import { CarWithImageType } from '../types/CarWithImageType';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
};

export const prepareCarData = (carData: CarWithImageType) => {
    const { name, description, brand, model, status, price, color, motorType, power, placeNumber, type, images } = carData;
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    return {
        name,
        description,
        brand,
        model,
        price: numericPrice,
        color,
        motorType,
        status,
        power,
        placeNumber,
        type,
        images: images ? images.map(image => ({ url: image.url })) : []
    };
};

export const deleteImages = async (urls: string[]) => {
    const imageDeletionPromises = urls.map(async (url) => {
        const imageName = getFileName(url);
        await deleteImage(imageName);
    });

    await Promise.all(imageDeletionPromises);
};

const getFileName = (url: string): string => {
    return url.split('/').pop() || '';
};
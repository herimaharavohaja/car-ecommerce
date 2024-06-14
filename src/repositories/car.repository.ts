import prisma from "../databases/db";
import { CarWithImageType } from "../types/CarWithImageType";
import { CarStatus } from "@prisma/client";
import { deleteImages, prepareCarData } from "../utils/utils";

export const findAllCars = async () => {
    try {
        return await prisma.car.findMany({
            include: {
                images: {
                    select: {
                        id: true,
                        url: true
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error in findAllCars:", error);
        throw error;
    }
};

export const createCar = async (carData: CarWithImageType) => {
    try {
        const preparedCarData = prepareCarData(carData);
        const createdCar = await prisma.car.create({
            data: {
                ...preparedCarData,
                images: {
                    createMany: {
                        data: preparedCarData.images
                    }
                }
            },
            include: { images: true }
        });

        return { ...createdCar, images: createdCar.images.map(img => ({ id: img.id, url: img.url })) };
    } catch (error) {
        console.error("Error in createCar:", error);
        throw error;
    }
};

export const updateCar = async (carId: string, carData: Partial<CarWithImageType>) => {
    try {
        const preparedCarData = prepareCarData(carData as CarWithImageType);

        const existingCar = await prisma.car.findUnique({
            where: { id: carId },
            include: { images: true }
        });

        if (!existingCar) {
            throw new Error(`Car with ID ${carId} not found.`);
        }

        const existingImages = existingCar.images;
        const existingUrls = existingImages.map(image => image.url);
        const updatedUrls = preparedCarData.images.map(image => image.url);
        const urlsToDelete = existingUrls.filter(url => !updatedUrls.includes(url));

        await deleteImages(urlsToDelete);

        await prisma.car.update({
            where: { id: carId },
            data: {
                name: preparedCarData.name,
                description: preparedCarData.description,
                brand: preparedCarData.brand,
                model: preparedCarData.model,
                price: preparedCarData.price,
                color: preparedCarData.color,
                motorType: preparedCarData.motorType,
                power: preparedCarData.power,
                placeNumber: preparedCarData.placeNumber,
                status: preparedCarData.status as CarStatus,
                type: preparedCarData.type,
            },
            include: { images: true }
        });

        await prisma.image.deleteMany({
            where: { carId: carId, url: { in: urlsToDelete } }
        });

        await prisma.image.createMany({
            data: updatedUrls.filter(url => !existingUrls.includes(url)).map(url => ({ url, carId }))
        });

        return await findCarById(carId);
    } catch (error) {
        console.error("Error in updateCar:", error);
        throw error;
    }
};

export const findCarById = async (carId: string) => {
    try {
        return await prisma.car.findUnique({
            where: { id: carId },
            include: { images: { select: { id: true, url: true } } }
        });
    } catch (error) {
        console.error(`Error in findCarById for car ID ${carId}:`, error);
        throw error;
    }
};

export const deleteCarById = async (carId: string) => {
    try {
        const carWithImages = await findCarById(carId);

        if (!carWithImages) {
            throw new Error(`Car with ID ${carId} not found.`);
        }

        const urlsToDelete = carWithImages.images.map(image => image.url);
        await deleteImages(urlsToDelete);

        await prisma.image.deleteMany({ where: { carId: carId } });
        return await prisma.car.delete({ where: { id: carId } });
    } catch (error) {
        console.error("Error in deleteCar:", error);
        throw error;
    }
};


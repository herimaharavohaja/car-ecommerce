import { Request, Response } from "express";
import { findAllCars, createCar as createCarInRepository, updateCar as updatedCarInRepository, findCarById, deleteCarById as deleteCarInRepository } from "../repositories/car.repository";

export const getAllCars = async (req: Request, res: Response) => {
    try {
        const cars = await findAllCars();
        res.json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ error: "Failed to fetch cars." });
    }
};

export const createCar = async (req: Request, res: Response) => {
    const { name, description, brand, model, price, color, motorType, power, placeNumber, type, status } = req.body;
    try {
        if (!req.files || !Array.isArray(req.files)) {
            return res.status(400).send({ message: "No file." });
        }
        const imageFiles = req.files as Express.Multer.File[];
        const port = process.env.APP_PORT || 3001;
        const urlApp = `${req.protocol}://${req.hostname}:${port}`;

        const images = imageFiles.map(file => ({
            url: `${urlApp}/${file.filename}`
        }));

        const createdCar = await createCarInRepository({ name, description, brand, model, price, status, color, motorType, power, placeNumber, type, images });
        res.status(201).json(createdCar);
    } catch (error) {
        console.error("Error creating car:", error);
        res.status(500).json({ error: "Failed to create car." });
    }
};


export const getCarById = async (req: Request, res: Response) => {
    const carId = req.params.id as string;
    try {
        const car = await findCarById(carId)
        res.json(car);
    } catch (error) {
        console.error(`Error finding car with ID ${carId}:`, error);
        res.status(500).json({ error: "Failed to find car." });
    }
}

export const deleteCar = async (req: Request, res: Response) => {
    const carId = req.params.id as string;
    try {
        const deletedCar = await deleteCarInRepository(carId)
        res.json(deletedCar);
    } catch (error) {
        console.error(`Error deleting car with ID ${carId}:`, error);
        res.status(500).json({ error: "Failed to delete car." });
    }
};


export const updateCar = async (req: Request, res: Response) => {
    const carId = req.params.id as string;
    const { name, description, brand, model, price, color, motorType, power, placeNumber, type } = req.body;
    try {
        if (!req.files || !Array.isArray(req.files)) {
            return res.status(400).send({ message: "No file." });
        }
        const imageFiles = req.files as Express.Multer.File[];
        const port = process.env.APP_PORT || 3001;
        const urlApp = `${req.protocol}://${req.hostname}:${port}`;

        const images = imageFiles.map(file => ({
            url: `${urlApp}/${file.filename}`
        }));
        const updatedCar = await updatedCarInRepository(carId, { name, description, brand, model, price, color, motorType, power, placeNumber, type, images });
        res.json(updatedCar);
    } catch (error) {
        console.error(`Error updating car with ID ${carId}:`, error);
        res.status(500).json({ error: "Failed to update car." });
    }
};
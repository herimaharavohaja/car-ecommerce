import { Request, Response } from "express";
import { findAllUsers, findUserById, deleteUserById as deleteUserByIdDB, updateUser as updateUserDB, createUser } from "../repositories/user.repository";
import { User } from "../types/User";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error:  error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({ error: `User with ID ${userId} not found.` });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error:  error instanceof Error ? error.message : 'Unknown error'  });
    }
};

export const deleteUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const deletedUser = await deleteUserByIdDB(userId);
        res.status(200).send(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error'});
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userData: Partial<User> = req.body;
    try {
        const updatedUser = await updateUserDB(userId, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(`Error in updateUser with ID ${userId}:`, error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};

import prisma from "../databases/db";
import { User } from "../types/User";
import { hashPassword } from "../utils/utils";

export const findAllUsers = async () => {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        console.error("Error in findAllUsers:", error);
        throw error;
    }
};

export const deleteUserById = async (userId: string) => {
    try {
        const user = await findUserById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }
        await prisma.user.delete({ where: { id: userId } });
        return user;
    } catch (error) {
        console.error("Error in deleteUserById:", error);
        throw error;
    }
};

export const createUser = async (user: User) => {
    try {
        const { password, name, email } = user;
        const doesExist = await prisma.user.findUnique({
            where: { email }
        });

        if (doesExist) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await hashPassword(password);
        return await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
        });
    } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
    }
};

export const findUserById = async (userId: string) => {
    try {
        return await prisma.user.findUnique({
            where: { id: userId }
        });
    } catch (error) {
        console.error(`Error finding user with ID ${userId}:`, error);
        throw error;
    }
};

export const findUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({
            where: { email }
        });
    } catch (error) {
        console.error(`Error finding user with email ${email}:`, error);
        throw error;
    }
};

export const updateUser = async (userId: string, userData: Partial<User>) => {
    try {
        const existingUser = await findUserById(userId);
        if (!existingUser) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        if (userData.email) {
            const doesExist = await prisma.user.findUnique({
                where: { email: userData.email }
            });

            if (doesExist && doesExist.id !== userId) {
                throw new Error("Email already in use by another user");
            }
        }

        if (userData.password) {
            userData.password = await hashPassword(userData.password);
        }

        return await prisma.user.update({
            where: { id: userId },
            data: userData,
        });
    } catch (error) {
        console.error("Error in updateUser:", error);
        throw error;
    }
};

import { Request, Response } from "express"
import { createUser as createUserInRepository, findUserByEmail, findUserById } from '../repositories/user.repository'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt"
import { verifyPassword } from "../utils/utils";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const passwordMatch = await verifyPassword(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }
        const accessToken = await signAccessToken(user)
        const refreshToken = await signRefreshToken(user)
        res.status(200).json({
            success: true,
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(404).json({
                error: "Refresh token not exists"
            });
        }
        const userId = await verifyRefreshToken(refreshToken)
        const user = await findUserById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        const accessToken = await signAccessToken(user)
        const newRefreshToken = await signRefreshToken(user)
        res.status(200).json({
            success: true,
            accessToken,
            refreshToken: newRefreshToken
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

export const logout = async (req: Request, res: Response) => {

}


export const register = async (req: Request, res: Response) => {
    const { name, password, email } = req.body;
    try {
        const createdUser = await createUserInRepository({ name, password, email });
        const acccessToken = await signAccessToken(createdUser);
        const refreshToken = await signRefreshToken(createdUser)
        res.status(201).json({
            success: true,
            acccessToken, refreshToken
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        res.status(500).json({ success: false, error: errorMessage });
    }
}
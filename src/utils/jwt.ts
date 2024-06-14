import { User } from "@prisma/client";
import jwt, { SignOptions, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';


export const signAccessToken = async (user: User): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const payload = {
            name: user.name,
            password: user.password,
        };

        try {
            const options: SignOptions = {
                expiresIn: "1h",
                issuer: user.email,
                audience: user.id
            };

            const secretKey = process.env.ACCESS_TOKEN_SECRET;

            if (!secretKey) {
                reject(new Error("ACCESS_TOKEN_SECRET is not defined"));
                return;
            }

            jwt.sign(payload, secretKey, options, (err, token) => {
                if (err) reject(err);
                if (token) resolve(token as string);
            });
        } catch (error) {
            reject(error);
        }
    });
};


export const signRefreshToken = async (user: User): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const payload = {
            name: user.name,
            password: user.password,
        };

        try {
            const options: SignOptions = {
                expiresIn: "1y",
                issuer: user.email,
                audience: user.id
            };

            const secretKey = process.env.REFRESH_TOKEN_SECRET;

            if (!secretKey) {
                reject(new Error("ACCESS_TOKEN_SECRET is not defined"));
                return;
            }

            jwt.sign(payload, secretKey, options, (err, token) => {
                if (err) reject(err);
                if (token) resolve(token as string);
            });
        } catch (error) {
            reject(error);
        }
    });
};



interface CustomRequest extends Request {
    payload?: any; 
}

export const verifyAccessToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
        return res.status(401).json({ success: false, error: "Access token is missing" });
    }

    const secretKey = process.env.ACCESS_TOKEN_SECRET;

    if (!secretKey) {
        return res.status(500).json({ success: false, error: "ACCESS_TOKEN_SECRET is not defined" });
    }

    const token = accessToken.split(" ")[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            if (err.name === "JsonWebTokenError") {
                return res.status(403).json({ success: false, error: "Invalid token" });
            } else if (err.name === "TokenExpiredError") {
                return res.status(403).json({ success: false, error: "Token expired" });
            } else {
                return res.status(500).json({ success: false, error: err.message });
            }
        }

        if (decoded) {
            req.payload = decoded;
        }
        next();
    });
};



export const verifyRefreshToken = async (refreshToken: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const secretKey = process.env.REFRESH_TOKEN_SECRET;

        if (!secretKey) {
            reject(new Error("REFRESH_TOKEN_SECRET is not defined"));
            return;
        }
        jwt.verify(refreshToken, secretKey, (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    reject(new Error("Invalid token"));
                } else if (err.name === "TokenExpiredError") {
                    reject(new Error("Token expired"));
                } else {
                    reject(new Error(err.message));
                }
            }
            if (decoded) {
                const userId = decoded.aud; 
                console.log(userId);
                
                resolve(userId);
            } else {
                reject(new Error("Unable to decode token"));
            }
        });
    });
};

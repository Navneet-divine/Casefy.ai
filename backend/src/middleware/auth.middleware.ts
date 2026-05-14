import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export interface AuthRequest extends Request {
    user?: {
        userId: string;
    };
}

export const isAuthenticated = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        // Verify token
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }

        // Attach user to request
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Authentication failed",
        });
    }
};
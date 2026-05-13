import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}

interface User {
    id: string;
    email: string;
    fullName: string;
}

export const signToken = (user: User) => {
    return jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );
};

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        return decoded;
    } catch (error) {
        return null;
    }
};
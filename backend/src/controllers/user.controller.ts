import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { signToken, verifyToken } from "../utils/jwt";


const isProduction = process.env.NODE_ENV === "production";

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    console.log("Received registration data:", { fullName, email, password });

    const userData = {
      fullName,
      email,
      password: await hashPassword(password),
    };

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = await prisma.user.create({
      data: userData,
    });

    const token = signToken(newUser);


    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ message: "Registration successful", user: newUser,});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValidUser = await comparePassword(password, user?.password || "");

    if (!isValidUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Login successful", user,});

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const current = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const payload = verifyToken(token);

    if (!payload || !payload.userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


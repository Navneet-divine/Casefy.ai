import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { signToken, verifyToken } from "../utils/jwt.js";


const isProduction = process.env.NODE_ENV === "production";

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    console.log("Received registration data:", { fullName, email, password });

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userData = {
      fullName,
      email,
      password: await hashPassword(password),
    };

    console.log('Checking for existing user with email:', email);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    console.log('Existing user result:', existingUser);

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    console.log('Creating user with data:', { fullName, email });
    const newUser = await prisma.user.create({
      data: userData,
    });
    console.log('New user created:', newUser);

    const token = signToken(newUser);


    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ message: "Registration successful", user: newUser,});
  } catch (error) {
    console.error('Register error:', error);
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


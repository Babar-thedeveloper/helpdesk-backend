import { eq, or } from "drizzle-orm";
import { db } from "../../config/db.js";
import { userTable } from "../../db/schema/index.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.validatedData?.body;

    console.log("Login request received:", { identifier });

    // Find user by email OR employeeId
    const users = await db
      .select()
      .from(userTable)
      .where(
        or(eq(userTable.email, identifier), eq(userTable.employeeId, identifier))
      )
      .limit(1);

    if (users.length === 0) {
      console.log("User not found with:", identifier);
      return res.status(404).json({ message: "User not found" });
    }

    const foundUser = users[0];

    const isMatch = await argon2.verify(foundUser.password, password);
    if (!isMatch) {
      console.log("Invalid credentials for:", identifier);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Build JWT payload
    const tokenPayload = {
      id: foundUser.id,
      email: foundUser.email,
      employeeId: foundUser.employeeId,
      role: foundUser.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    console.log("User logged in successfully:", identifier);
    return res.status(200).json({
      message: "Login successful",
      token,
    
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

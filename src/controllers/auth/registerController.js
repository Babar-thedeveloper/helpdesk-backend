import argon2 from "argon2";
import { userTable } from "../../db/schema/index.js";
import { db } from "../../config/db.js";
import { eq } from "drizzle-orm";

export const register = async (req, res) => {
  try {
    const {
      employeeId,
      fullName,
      phone,
      email,
      department,
      designation,
      password,
    } = req.validatedData?.body;

    console.log("Registration request:", {
      employeeId,
      fullName,
      phone,
      email,
      department,
      designation,
    });

    // Check if email already exists
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (existingUser.length > 0) {
      console.log("Email already exists:", email);
      return res.status(409).json({ message: "Email already registered." });
    }

    // Check if employeeId already exists
    const existingEmployee = await db
      .select()
      .from(userTable)
      .where(eq(userTable.employeeId, employeeId));

    if (existingEmployee.length > 0) {
      console.log("Employee ID already exists:", employeeId);
      return res.status(409).json({ message: "Employee ID already registered." });
    }

    // Hash password
    const hashedPassword = await argon2.hash(password);

    // Insert new user with default role "user"
    await db.insert(userTable).values({
      employeeId,
      fullName,
      phone,
      email,
      department,
      designation,
      password: hashedPassword,
      role: "user", // default role
    });

    console.log("User registered:", email);
    return res.status(201).json({ message: "User registered successfully." });

  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

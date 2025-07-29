import { z } from 'zod';


export const registerSchema = z.object({
  employeeId: z
    .string({ message: "Employee ID is required" })
    .min(3, "Employee ID must be at least 3 characters")
    .max(20, "Employee ID must be less than 20 characters")
    .nonempty("Employee ID is required"),

  fullName: z
    .string({ message: "Full Name is required" })
    .min(3, "Full Name must be at least 3 characters")
    .max(100, "Full Name must be less than 100 characters")
    .nonempty("Full Name is required"),

  phone: z
    .string({ message: "Phone number is required" })
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^[0-9+]+$/, "Phone number must contain only digits and optional '+'"),

  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),

  department: z
    .string({ message: "Department is required" })
    .min(2, "Department must be at least 2 characters")
    .max(50, "Department must be at most 50 characters"),

  designation: z
    .string({ message: "Designation is required" })
    .min(2, "Designation must be at least 2 characters")
    .max(50, "Designation must be at most 50 characters"),

  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password must be less than 255 characters")
    .nonempty("Password is required"),

  role: z
    .enum(["user", "admin", "supervisor", "agent", "department_head"])
    .optional(), // optional for registration, defaults to 'user'
});



export const loginSchema = z.object({
  identifier: z
    .string({ message: "Email or Employee ID is required" })
    .min(3),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});



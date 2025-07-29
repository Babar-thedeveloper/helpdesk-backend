import express from 'express';
import { login, register } from '../controllers/index.js';
import validate from '../middlewares/validatate.js';
import { loginSchema, registerSchema } from '../validations/authValidation.js';



const router = express.Router();


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user in the system. The user must provide unique employee ID, email, and other required details. A default role of "user" is assigned unless overridden by an admin. Data is stored in a MySQL database using Drizzle ORM.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *               - fullName
 *               - phone
 *               - email
 *               - department
 *               - designation
 *               - password
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: EMP001
 *                 description: A unique Employee ID used for login.
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *                 description: Full name of the user.
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: Valid phone number.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *                 description: A unique email address.
 *               department:
 *                 type: string
 *                 example: IT
 *                 description: Department name (e.g., IT, HR, Finance).
 *               designation:
 *                 type: string
 *                 example: Software Engineer
 *                 description: Job designation.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123!
 *                 description: User's password (will be hashed).
 *               role:
 *                 type: string
 *                 enum: [user, admin, supervisor, agent, department_head]
 *                 example: user
 *                 description: Optional. User role; defaults to "user" if not provided.
 *     responses:
 *       201:
 *         description: User account created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully."
 *       400:
 *         description: Validation error (missing or invalid fields).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation failed."
 *       409:
 *         description: Conflict - Employee ID or email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email or Employee ID already registered."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.post("/register",validate({body:registerSchema}),register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user using either their email or employee ID along with a password. On success, returns a JWT token containing user info and role for access control.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 example: john.doe@example.com
 *                 description: The user's email or employee ID.
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 maxLength: 255
 *                 example: SecurePass123!
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   description: Basic user info extracted from the token.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     employeeId:
 *                       type: string
 *                       example: EMP001
 *                     role:
 *                       type: string
 *                       example: supervisor
 *       400:
 *         description: Validation error (missing or invalid fields).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation failed."
 *       401:
 *         description: Unauthorized - Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
    
router.post("/login",validate({body:loginSchema}),login)

export default router;

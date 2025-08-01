import express from 'express';
import { getSupervisorByDepartmentAndRole } from '../controllers/supervisor.controller.js';
import { getAllDepartments } from '../controllers/department.controller.js';
import { getSupervisorTickets } from '../controllers/supervisor.controller.js';

const router = express.Router();

/**
 * @swagger
 * /supervisor/{departmentName}:
 *   post:
 *     summary: Get supervisors by department and role
 *     description: Returns a list of users who are supervisors in the specified department.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: departmentName
 *         in: path
 *         description: The name of the department to filter the users by
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved supervisors for the department.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fullName:
 *                         type: string
 *                         example: "John Doe"
 *                       department:
 *                         type: string
 *                         example: "IT"
 *                       role:
 *                         type: string
 *                         example: "supervisor"
 *                       employeeId:
 *                         type: string
 *                         example: "EMP12345"
 *       400:
 *         description: Bad request when departmentName is missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Department name is required in params."
 *       500:
 *         description: Internal Server Error when an unexpected error occurs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
router.post('/:departmentName', getSupervisorByDepartmentAndRole);

/**
 * @swagger
 * /supervisor/departments:
 *   get:
 *     summary: Retrieve all departments
 *     description: Fetches all departments stored in the system.
 *     tags:
 *       - Departments
 *     responses:
 *       200:
 *         description: Successfully retrieved all departments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Departments fetched successfully"
 *                 departments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "HR"
 *                       description:
 *                         type: string
 *                         example: "Human Resources Department"
 *       404:
 *         description: No departments found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No departments found"
 *       500:
 *         description: Internal Server Error when an unexpected error occurs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: string
 *                   example: "Error message details"
 */
router.get('/departments', getAllDepartments);



router.get('/tickets/:employeeId', getSupervisorTickets);

export default router;

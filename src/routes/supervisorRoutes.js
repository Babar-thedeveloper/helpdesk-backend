import express from 'express';
import { assignTicketToAgent, getAgentsByDepartment, getSupervisorByDepartmentAndRole, getUserByEmployeeId } from '../controllers/supervisor.controller.js';
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
 * /supervisor/user/{employeeId}:
 *   get:
 *     summary: Get user by employee ID
 *     description: Retrieve a single user from the database using their employee ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *         description: The employee ID of the user
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: User found and returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     fullName:
 *                       type: string
 *                       example: "Alice Johnson"
 *                     email:
 *                       type: string
 *                       example: "alice@example.com"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     department:
 *                       type: string
 *                       example: "Support"
 *                     designation:
 *                       type: string
 *                       example: "Agent"
 *                     employeeId:
 *                       type: integer
 *                       example: 101
 *       400:
 *         description: Invalid or missing employee ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid or missing employee ID"
 *       404:
 *         description: No user found with the provided employee ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error while fetching user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch user. Please try again later."
 */

router.get('/user/:employeeId', getUserByEmployeeId);


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



/**
 * @swagger
 * /supervisor/tickets/{employeeId}:
 *   get:
 *     summary: Retrieve tickets assigned to a supervisor
 *     description: Fetches all tickets assigned to a supervisor by the supervisor's employee ID.
 *     tags:
 *       - Supervisor 
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         description: The employee ID of the supervisor.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Successfully retrieved tickets assigned to the supervisor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tickets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ticketId:
 *                         type: integer
 *                         example: 123
 *                       description:
 *                         type: string
 *                         example: "System malfunction"
 *                       status:
 *                         type: string
 *                         example: "Open"
 *                       department:
 *                         type: string
 *                         example: "IT"
 *                       remarks:
 *                         type: string
 *                         example: "Investigating issue"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-08-01T12:00:00Z"
 *                       agentAction:
 *                         type: string
 *                         example: "Restarted server"
 *                       resolvedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-08-02T15:30:00Z"
 *                       expired:
 *                         type: boolean
 *                         example: false
 *                       userEmployeeId:
 *                         type: integer
 *                         example: 201
 *                       userFullName:
 *                         type: string
 *                         example: "John Doe"
 *                       userEmail:
 *                         type: string
 *                         example: "johndoe@example.com"
 *                       userPhone:
 *                         type: string
 *                         example: "+1234567890"
 *                       userDepartment:
 *                         type: string
 *                         example: "Engineering"
 *                       userDesignation:
 *                         type: string
 *                         example: "Software Engineer"
 *       400:
 *         description: Invalid employee ID provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee ID must be a valid number"
 *       404:
 *         description: No tickets found for the given supervisor ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tickets found for this supervisor"
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
router.get('/tickets/:employeeId', getSupervisorTickets);


/**
 * @swagger
 * /supervisor/agents/{employeeId}:
 *   get:
 *     summary: Retrieve agents by department for a supervisor
 *     description: Fetches all agents belonging to the department of the supervisor identified by the employee ID.
 *     tags:
 *       - Supervisor
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         description: The employee ID of the supervisor.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Successfully retrieved agents in the supervisor's department.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 agents:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       fullName:
 *                         type: string
 *                         example: "Jane Smith"
 *                       employeeId:
 *                         type: integer
 *                         example: 14401
 *                       email:
 *                         type: string
 *                         example: "jane.smith@example.com"
 *                       phone:
 *                         type: string
 *                         example: "+1234567890"
 *                       designation:
 *                         type: string
 *                         example: "Customer Support Agent"
 *                       availability:
 *                         type: string
 *                         example: "Available"
 *                       department:
 *                         type: string
 *                         example: "Sales"
 *       400:
 *         description: Invalid employee ID provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid employee ID"
 *       404:
 *         description: No supervisor found with the given employee ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Supervisor not found"
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
router.get('/agents/:employeeId', getAgentsByDepartment);



/**
 * @swagger
 * /supervisor/tickets/assign:
 *   post:
 *     summary: Assign a ticket to an agent
 *     description: This endpoint assigns a ticket to an agent, including the ticket ID, agent's employee ID, and remarks (optional).
 *     tags:
 *       - Supervisor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketId:
 *                 type: integer
 *                 description: The ID of the ticket to be assigned.
 *                 example: 123
 *               agentEmployeeId:
 *                 type: integer
 *                 description: The employee ID of the agent to whom the ticket will be assigned.
 *                 example: 14401
 *               remarks:
 *                 type: string
 *                 description: Optional remarks regarding the ticket assignment.
 *                 example: "Please resolve ASAP"
 *     responses:
 *       200:
 *         description: Successfully assigned the ticket to the agent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ticket successfully assigned to agent."
 *       400:
 *         description: Missing required parameters or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ticketId and agentEmployeeId are required."
 *       404:
 *         description: The agent or ticket does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Agent not found."
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
 *       401:
 *         description: Unauthorized access if user is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 */
router.post('/tickets/assign', assignTicketToAgent);


export default router;

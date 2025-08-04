import express from 'express';
import { getAgentTickets, resolveTicketHandler, startTicketHandler } from '../controllers/agents.controller.js';


const router = express.Router();

/**
 * @swagger
 * /agent/tickets/{employeeId}:
 *   get:
 *     summary: Get tickets assigned to an agent
 *     description: Retrieve all tickets assigned to a specific agent using their employee ID.
 *     tags:
 *       - Agent-Tickets
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *         description: The employee ID of the agent
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Successfully retrieved tickets assigned to the agent.
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
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       agentId:
 *                         type: integer
 *                         example: 101
 *                       userId:
 *                         type: integer
 *                         example: 201
 *                       supervisorId:
 *                         type: integer
 *                         example: 301
 *                       description:
 *                         type: string
 *                         example: "Unable to access account"
 *                       remarks:
 *                         type: string
 *                         example: "User will reset password"
 *                       status:
 *                         type: string
 *                         example: "in-progress"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-08-03T14:30:00.000Z"
 *                       resolvedAt:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: "2025-08-04T09:45:00.000Z"
 *       400:
 *         description: Invalid employee ID provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid Employee ID"
 *       500:
 *         description: Internal server error while fetching tickets.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.get('/tickets/:employeeId', getAgentTickets);



/**
 * @swagger
 * /agent/start-ticket:
 *   post:
 *     summary: Start a ticket and mark agent as busy
 *     description: Updates a ticket's status to "in_progress" and sets the agent's availability to "busy".
 *     tags:
 *       - Agent-Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticketId
 *               - agentEmployeeId
 *             properties:
 *               ticketId:
 *                 type: integer
 *                 example: 12
 *               agentEmployeeId:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       200:
 *         description: Ticket marked as in progress and agent marked as busy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ticket is now in progress and agent is marked busy."
 *       400:
 *         description: Bad request - missing ticketId or agentEmployeeId.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ticketId and agentEmployeeId are required"
 *       500:
 *         description: Internal server error during the ticket start process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post('/start-ticket',startTicketHandler);

/**
 * @swagger
 * /agent/resolve-ticket:
 *   post:
 *     summary: Resolve or reject a ticket and mark agent as available
 *     description: Updates a ticket's status (resolved or rejected), sets the agent's action and resolution time, and marks the agent as available again.
 *     tags:
 *       - Agent-Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticketId
 *               - agentEmployeeId
 *               - agentAction
 *               - resolvedAt
 *             properties:
 *               ticketId:
 *                 type: integer
 *                 example: 12
 *               agentEmployeeId:
 *                 type: integer
 *                 example: 101
 *               agentAction:
 *                 type: string
 *                 enum: [resolved, rejected]
 *                 example: resolved
 *               resolvedAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-08-04T12:34:56.000Z"
 *     responses:
 *       200:
 *         description: Ticket marked as resolved or rejected, and agent set to available.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ticket marked as resolved. Agent is now available."
 *       400:
 *         description: Bad request - missing or invalid required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: Internal server error during the resolution process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post('/resolve-ticket',resolveTicketHandler);

export default router;

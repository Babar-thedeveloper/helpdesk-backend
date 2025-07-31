// routes/ticketRoutes.js

import express from 'express';
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
 
} from '../controllers/ticket.controller.js';
import validate from '../middlewares/validatate.js';
import { ticketSchema } from '../validations/ticketValidation.js';


const router = express.Router();

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Create a new ticket
 *     description: Creates a new ticket in the system, associating it with a user, supervisor, and department.
 *     tags:
 *       - Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - supervisorId
 *               - department
 *               - description
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the user who created the ticket.
 *               supervisorId:
 *                 type: integer
 *                 example: 2
 *                 description: The ID of the supervisor handling the ticket.
 *               department:
 *                 type: string
 *                 example: "IT"
 *                 description: The department to which the ticket belongs.
 *               description:
 *                 type: string
 *                 example: "System is down"
 *                 description: A detailed description of the issue.
 *     responses:
 *       201:
 *         description: Ticket created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ticket created successfully"
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
router.post('/',validate({body:ticketSchema}), createTicket);

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Retrieve all tickets
 *     description: Fetches all tickets stored in the system.
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: Successfully retrieved all tickets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     example: 1
 *                   supervisorId:
 *                     type: integer
 *                     example: 2
 *                   department:
 *                     type: string
 *                     example: "IT"
 *                   description:
 *                     type: string
 *                     example: "System is down"
 *                   status:
 *                     type: string
 *                     example: "open"
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
router.get('/', getAllTickets);

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Get a specific ticket by ID
 *     description: Retrieves a ticket using its unique ID.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the ticket to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the ticket.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 supervisorId:
 *                   type: integer
 *                   example: 2
 *                 department:
 *                   type: string
 *                   example: "IT"
 *                 description:
 *                   type: string
 *                   example: "System is down"
 *                 status:
 *                   type: string
 *                   example: "open"
 *       404:
 *         description: Ticket not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ticket not found"
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
router.get('/:id', getTicketById);

/**
 * @swagger
 * /tickets/{id}:
 *   put:
 *     summary: Update a specific ticket by ID
 *     description: Updates the status and other details of a ticket by its ID.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the ticket to update.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "resolved"
 *               agentAction:
 *                 type: string
 *                 example: "resolved"
 *               remarks:
 *                 type: string
 *                 example: "Issue resolved successfully"
 *     responses:
 *       200:
 *         description: Ticket updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ticket updated successfully"
 *       404:
 *         description: Ticket not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ticket not found"
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
router.put('/:id', updateTicket);

/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     summary: Delete a ticket by ID
 *     description: Deletes a ticket from the system using its unique ID.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the ticket to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Ticket deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ticket deleted successfully"
 *       404:
 *         description: Ticket not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ticket not found"
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
router.delete('/:id', deleteTicket);

export default router;

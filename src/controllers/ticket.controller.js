import { db } from '../config/db.js';  // Import the database connection
import { ticketTable } from '../db/schema/tickets.schema.js';  // Import the ticket schema
import { userTable } from '../db/schema/user.schema.js';


export const createTicket = async (req, res) => {
  try {
    const { userId, supervisorId, department, description } = req.body;

    const result = await db
      .insert(ticketTable)
      .values({
        userId,
        supervisorId,
        department,           // ✅ Add this line
        description,
        status: 'open',
        expired: false,
        createdAt: new Date(),
      });

    return res.status(201).json({
      message: 'Ticket created successfully',
      insertedId: result.insertId,
    });

  } catch (error) {
    console.error('❌ Error creating ticket:', error);
    return res.status(500).json({ message: 'Error creating ticket' });
  }
};


// Get all tickets (GET)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await db.select().from(ticketTable);
    return res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching tickets' });
  }
};

// Get a specific ticket by ID (GET)
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;  // Fetching `id` from URL params

    // Fetch the ticket by ID
    const [ticket] = await db.select().from(ticketTable).where({ id });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching ticket' });
  }
};

// Update a ticket (PUT)
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;  // Ticket ID from URL params
    const { status, agentAction, remarks } = req.body;

    // Update the ticket
    const updatedTicket = await db
      .update(ticketTable)
      .set({ status, agentAction, remarks })
      .where({ id });

    // Check if the ticket exists
    if (updatedTicket.count === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Fetch the updated ticket
    const [ticket] = await db.select().from(ticketTable).where({ id });

    return res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating ticket' });
  }
};

// Delete a ticket (DELETE)
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;  // Ticket ID from URL params

    // Delete the ticket
    const deletedTicket = await db
      .deleteFrom(ticketTable)
      .where({ id });

    // Check if the ticket was found and deleted
    if (deletedTicket.count === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    return res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting ticket' });
  }
};

import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { ticketTable } from "../db/schema/tickets.schema.js";
import { userTable } from "../db/schema/user.schema.js";


export const getAgentTickets = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const parsedId = parseInt(employeeId);

    if (!parsedId) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    console.log("📦 Fetching tickets for agentId =", parsedId);

    const tickets = await db
      .select()
      .from(ticketTable)
      .where(eq(ticketTable.agentId, parsedId));

    console.log(`✅ Found ${tickets.length} ticket(s) for agent ${parsedId}`);
    return res.status(200).json({ tickets });

  } catch (error) {
    console.error("🔥 Error fetching agent tickets:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const startTicketHandler = async (req, res) => {
  try {
    const { ticketId, agentEmployeeId } = req.body;

    if (!ticketId || !agentEmployeeId) {
      return res.status(400).json({ message: 'ticketId and agentEmployeeId are required' });
    }

    // Update ticket status to in_progress
    await db.update(ticketTable)
      .set({ status: 'in_progress' })
      .where(eq(ticketTable.id, ticketId));

    // Update agent availability to busy
    await db.update(userTable)
      .set({ availability: 'busy' })
      .where(eq(userTable.employeeId, agentEmployeeId));

    return res.status(200).json({ message: 'Ticket is now in progress and agent is marked busy.' });
  } catch (error) {
    console.error('🔥 Error in startTicketHandler:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



export const resolveTicketHandler = async (req, res) => {
  try {
    const { ticketId, agentEmployeeId, agentAction, resolvedAt } = req.body;

    if (!ticketId || !agentEmployeeId || !agentAction || !resolvedAt) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Update ticket status to resolved or rejected
    await db.update(ticketTable)
  .set({
    status: 'resolved',
    agentAction,
    resolvedAt: new Date(resolvedAt) // ✅ Convert to valid Date object
  })
  .where(eq(ticketTable.id, ticketId));

    // Set agent back to available
    await db.update(userTable)
      .set({ availability: 'available' })
      .where(eq(userTable.employeeId, agentEmployeeId));

    return res.status(200).json({ message: `Ticket marked as ${agentAction}. Agent is now available.` });
  } catch (error) {
    console.error('🔥 Error in resolveTicketHandler:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
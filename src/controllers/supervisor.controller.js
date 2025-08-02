import { eq, and } from 'drizzle-orm';

import { db } from '../config/db.js'; // your configured drizzle DB client
import { ticketTable, userTable } from '../db/schema/index.js';

export const getSupervisorByDepartmentAndRole = async (req, res) => {
  try {
    const { departmentName } = req.params;

    if (!departmentName) {
      return res.status(400).json({ message: 'Department name is required in params.' });
    }

    const users = await db
      .select({
        fullName: userTable.fullName,
        department: userTable.department,
        role: userTable.role,
        employeeId: userTable.employeeId,
      })
      .from(userTable)
      .where(
        and(
          eq(userTable.department, departmentName),
          eq(userTable.role, 'supervisor')
        )
      );

    return res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users by department:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



export const getSupervisorTickets = async (req, res) => {
  try {
    console.log("🔁 Route hit: /api/supervisor/tickets/:employeeId");
    const { employeeId } = req.params;
    console.log("📥 employeeId received:", employeeId);

    const parsedId = parseInt(employeeId);
    if (isNaN(parsedId)) {
      console.log("❌ Invalid employeeId: not a number");
      return res.status(400).json({ message: "Employee ID must be a valid number" });
    }

    console.log("🔎 Fetching tickets where supervisorId =", parsedId);

    const tickets = await db
      .select({
        ticketId: ticketTable.id,
        description: ticketTable.description,
        status: ticketTable.status,
        department: ticketTable.department,
        remarks: ticketTable.remarks,
        createdAt: ticketTable.createdAt,
        agentAction: ticketTable.agentAction,
        resolvedAt: ticketTable.resolvedAt,
        expired: ticketTable.expired,

        userEmployeeId: userTable.employeeId,
        userFullName: userTable.fullName,
        userEmail: userTable.email,
        userPhone: userTable.phone,
        userDepartment: userTable.department,
        userDesignation: userTable.designation
      })
      .from(ticketTable)
      .innerJoin(userTable, eq(ticketTable.userId, userTable.employeeId)) // <-- FIXED THIS LINE
      .where(eq(ticketTable.supervisorId, parsedId));

    console.log(`✅ Found ${tickets.length} ticket(s) for supervisorId = ${parsedId}`);
    return res.status(200).json({ tickets });

  } catch (error) {
    console.error("🔥 Error in getSupervisorTickets:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




export const getAgentsByDepartment = async (req, res) => {
  try {
    console.log("📥 Params:", req.params);
    const { employeeId } = req.params;
    const parsedId = parseInt(employeeId);

    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    // Step 1: Find the supervisor and get department
    const supervisor = await db
      .select({
        department: userTable.department,
      })
      .from(userTable)
      .where(eq(userTable.employeeId, parsedId))
      .limit(1);

    if (supervisor.length === 0) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    const department = supervisor[0].department;
    console.log("✅ Supervisor Department:", department);

    // Step 2: Find agents in that department
    const agents = await db
      .select({
        id: userTable.id,
        fullName: userTable.fullName,
        employeeId: userTable.employeeId,
        email: userTable.email,
        phone: userTable.phone,
        designation: userTable.designation,
        availability: userTable.availability,
        department: userTable.department
      })
      .from(userTable)
      .where(
        and(
          eq(userTable.role, 'agent'),
          eq(userTable.department, department)
        )
      );

    console.log(`✅ Found ${agents.length} agent(s) in department "${department}"`);
    return res.status(200).json({ agents });

  } catch (error) {
    console.error("❌ Error fetching agents:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const assignTicketToAgent = async (req, res) => {
  try {
    console.log("🎯 Assign Ticket Controller Hit");
    const { ticketId, agentEmployeeId, remarks } = req.body;

    if (!ticketId || !agentEmployeeId) {
      return res.status(400).json({ message: "ticketId and agentEmployeeId are required." });
    }

    const parsedTicketId = parseInt(ticketId);
    const parsedAgentId = parseInt(agentEmployeeId);

    // Step 1: Get the agent
    const [agent] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.employeeId, parsedAgentId));

    if (!agent) {
      return res.status(404).json({ message: "Agent not found." });
    }

    // Step 2: Update the ticket
    const updated = await db
      .update(ticketTable)
      .set({
        agentId: parsedAgentId,
        remarks: remarks || null,
      })
      .where(eq(ticketTable.id, parsedTicketId));

    console.log("✅ Ticket assigned:", updated);
    return res.status(200).json({ message: "Ticket successfully assigned to agent." });

  } catch (error) {
    console.error("🔥 Error assigning ticket:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

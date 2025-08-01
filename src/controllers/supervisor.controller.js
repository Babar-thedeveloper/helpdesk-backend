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

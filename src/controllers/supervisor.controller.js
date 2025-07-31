import { eq, and } from 'drizzle-orm';

import { db } from '../config/db.js'; // your configured drizzle DB client
import { userTable } from '../db/schema/index.js';

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
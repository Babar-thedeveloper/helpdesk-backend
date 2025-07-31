import { mysqlTable, int, varchar, timestamp, mysqlEnum, boolean } from 'drizzle-orm/mysql-core';

export const ticketTable = mysqlTable('tickets', {
  id: int('id').primaryKey().autoincrement(), // Auto-incrementing primary key
  userId: int('user_id').notNull(), // User ID
  supervisorId: int('supervisor_id').notNull(), // Supervisor ID
  agentId: int('agent_id'), // Nullable agent ID

  department: varchar('department', { length: 50 }).notNull(),
  description: varchar('description', { length: 255 }),
  remarks: varchar('remarks', { length: 255 }), // Nullable remarks

  status: mysqlEnum('status', ['open', 'in_progress', 'resolved', 'rejected', 'expired'])
    .notNull()
    .default('open'), // Default status to 'open'
  
  agentAction: mysqlEnum('agent_action', ['resolved', 'rejected']),
  
  createdAt: timestamp('created_at').defaultNow().notNull(), // Auto-set current timestamp
  resolvedAt: timestamp('resolved_at'), // Nullable timestamp for resolved tickets
  expired: boolean('expired').default(false), // Default to false for expired flag
});

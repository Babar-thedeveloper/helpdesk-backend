import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const departmentTable = mysqlTable('departments', {
  id: int('id').primaryKey().autoincrement(), // Auto-incrementing department ID
  name: varchar('name', { length: 50 }).notNull(), // Department name
});

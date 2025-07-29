import { mysqlTable, varchar, serial, index, mysqlEnum } from 'drizzle-orm/mysql-core';

// User Table Schema
export const userTable = mysqlTable('users', {
  id: serial('id').primaryKey(),

  employeeId: varchar('employee_id', { length: 20 }).notNull().unique(),
  fullName: varchar('full_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 15 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  department: varchar('department', { length: 50 }).notNull(),
  designation: varchar('designation', { length: 50 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(), // hashed password

  // New Role Field (for RBAC)
  role: mysqlEnum('role', ['user', 'admin', 'supervisor', 'agent', 'department_head'])
    .notNull()
    .default('user'),
}, (users) => ({
  emailIdx: index('email_idx').on(users.email),
  employeeIdIdx: index('employee_id_idx').on(users.employeeId),
}));

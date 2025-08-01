import {
  mysqlTable,
  int,
  varchar,
  serial,
  index,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

export const userTable = mysqlTable('users', {
  id: serial('id').primaryKey(), // Internal unique ID (auto-increment)

  employeeId: int('employee_id').notNull().unique(), // Now an integer for FK use
  fullName: varchar('full_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 15 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  department: varchar('department', { length: 50 }).notNull(),
  designation: varchar('designation', { length: 50 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),

  role: mysqlEnum('role', [
    'user',
    'admin',
    'supervisor',
    'agent',
    'department_head',
  ]).notNull().default('user'),

  availability: mysqlEnum('availability', ['available', 'busy'])
    .default('available')
    .notNull(),
}, (users) => ({
  emailIdx: index('email_idx').on(users.email),
  employeeIdIdx: index('employee_id_idx').on(users.employeeId),
}));

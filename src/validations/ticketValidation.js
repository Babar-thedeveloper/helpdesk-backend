import { z } from 'zod';

export const ticketSchema = z.object({
  userId: z
    .number()
    .int("User ID must be an integer")
    .positive("User ID must be a positive integer")
    .gt(0, "User ID must be greater than 0")
    .optional(), // Optional to allow non-required on creation or update

  supervisorId: z
    .number()
    .int("Supervisor ID must be an integer")
    .positive("Supervisor ID must be a positive integer")
    .gt(0, "Supervisor ID must be greater than 0")
    .optional(), // Optional to allow non-required on creation or update

  agentId: z
    .number()
    .int("Agent ID must be an integer")
    .positive("Agent ID must be a positive integer")
    .optional(), // Optional for when agent is not assigned
  department: z
    .string()
    .min(1, "Department is required")
    .max(50, "Department name cannot be longer than 50 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(255, "Description cannot be longer than 255 characters"),

  remarks: z
    .string()
    .max(255, "Remarks cannot be longer than 255 characters")
    .optional(), // Optional

  status: z
    .enum(['open', 'in_progress', 'resolved', 'rejected', 'expired'])
    .default('open'),

  agentAction: z
    .enum(['resolved', 'rejected'])
    .optional(), // Optional for when agent has not taken action

  createdAt: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), "Created at must be a valid date")
    .optional(), // Optional since this might be automatically set

  resolvedAt: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), "Resolved at must be a valid date")
    .optional(), // Optional, only filled when resolved

  expired: z.boolean().default(false), // Default to false if not specified
});
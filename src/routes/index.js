// routes/index.js

import express from 'express';
import authRoutes from './authRoutes.js';  // Assuming this is your auth routes
import ticketRoutes from './ticketRoutes.js';  // Import ticket routes
import supervisorRoutes from './supervisorRoutes.js';  // Import supervisor routes if needed
import agentRoutes from './agentRoutes.js';  // Import agent routes
const router = express.Router();

// Auth routes
router.use('/auth', authRoutes);

// Ticket routes
router.use('/tickets', ticketRoutes);

// suepervisor  routes
router.use('/supervisor',supervisorRoutes);


router.use('/agent', agentRoutes);  // Use agent routes

export default router;

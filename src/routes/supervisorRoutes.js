import express from 'express';
import { getSupervisorByDepartmentAndRole } from '../controllers/supervisor.controller.js';
// import { getAllDepartments } from '../controllers/department.controller.js';

const router = express.Router();

// Modify the route to accept a department name as a parameter
router.post('/:departmentName', getSupervisorByDepartmentAndRole);
// router.post('/departments', getAllDepartments); 
export default router;

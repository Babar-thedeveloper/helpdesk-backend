import { db } from '../config/db.js';  // Drizzle ORM database connection
import { departmentTable } from '../db/schema/index.js';  // Department table schema

// Fetch all departments
export const getAllDepartments = async (req, res) => {
  try {
    console.log("Fetching all departments");

    // Fetch all departments from the departmentTable
    const departments = await db
      .select()  // Select all fields from the departmentTable
      .from(departmentTable);

    // Log the fetched departments to the console
    console.log("Fetched Departments:", departments);

    // If no departments are found, return a 404 response
    if (departments.length === 0) {
      return res.status(404).json({ message: 'No departments found' });
    }

    // Return the departments in the response
    return res.status(200).json({
      message: 'Departments fetched successfully',
      departments: departments  // Send the department data back in the response
    });

  } catch (error) {
    // Log the error and return a 500 response in case of failure
    console.error('Error fetching departments:', error.message);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};


// export const getAllBookings = async (req, res) => {

//     try {

//         console.log("Fetching all the bookings");

//         const bookings = await db.select().from(bookingsTable);

//         console.log("Fetched Bookings", bookings);
//         return res.status(201).json({ message: "fetched bookings succesfully", bookings });



//     } catch (error) {
//         console.error("Error fetching bookings", error.messgae);
//         return res.status(500).json({ message: "Failed during fetching the bookings:" });
//     }
// }
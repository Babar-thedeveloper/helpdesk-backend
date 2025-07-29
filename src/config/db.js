import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4',
});

export const db = drizzle(pool);
export { pool };

(async () => {
    try {
        await db.execute("SELECT 1");
        console.log('Database connection successful!');
    }
    catch (error){
        console.error('Error connecting to the database:',error);
        process.exit(1);
    }
})();
import app from './src/app.js';
import "./src/config/db.js"


console.log('Host:', process.env.DB_HOST);
console.log('User:', process.env.DB_USER);
console.log('Password:', process.env.DB_PASSWORD); 
console.log('Database:', process.env.DB_NAME);
console.log('Port:', process.env.DB_PORT);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {    
  console.log(`Server is running on port ${PORT}`);
});
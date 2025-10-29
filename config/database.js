import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

// Crear conexion
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
 
// Prueba de conexión
await pool.getConnection()
  .then(conn => {
    console.log('✅ Conexión establecida con la BD');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error al establecer la conexión con la BD: \n', err);
  });
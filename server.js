// server.js
import dotenv from 'dotenv';
dotenv.config();
import app from "./app.js";



console.log("DB USER:", process.env.DB_USER);
console.log("DB PASSWORD:", process.env.DB_PASSWORD);
console.log("DB HOST:", process.env.DB_HOST);
console.log("DB NAME:", process.env.DB_NAME);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor iniciado en http://localhost:" + PORT);
});

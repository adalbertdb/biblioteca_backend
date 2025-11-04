import {pool} from "../config/database.js";

export async function getPeliculas() {
    const [rows] =  await pool.query("SELECT * FROM vw_peliculas");
    return rows;
}

export async function getPeliculaById(id) {
    const [rows] =  await pool.query("SELECT * FROM peliculas WHERE id = ?", [id]);
    if (rows.length === 0) {
        return null;
    }
    const row = rows[0];
    return row;
}

export async function createPelicula(pelicula) {
    const connection = await pool.getConnection();
    try {
        connection.beginTransaction();

        const [resultRecurso] = await connection.execute(
            "INSERT INTO recursos (tipo, titulo, num_ejemplares) VALUES (? , ?, ?)",
            [2,]
        )
    } catch (error) {
        
    }
        
}
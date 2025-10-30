import {pool} from "../config/database.js";
import Pelicula from "../models/Pelicula.js";

export async function getPeliculas() {
    const [rows] =  await pool.query("SELECT * FROM recursos WHERE tipo = 2;");
    return rows.map(row => new Pelicula(row.titol, row.director, row.genere, row.numExemplars));
}

export async function getPeliculaById(id) {
    const [rows] =  await pool.query("SELECT * FROM peliculas WHERE id = ?", [id]);
    if (rows.length === 0) {
        return null;
    }
    const row = rows[0];
    return new Pelicula(row.titol, row.director, row.genere, row.numExemplars);
}

export async function createPelicula(pelicula) {
    const resultado = await pool.query(
        "INSERT INTO Recursos (tipo, titulo,numExemplars) VALUES (?, ?, ?)",
        [pelicula.titol, pelicula.director, pelicula.genere, pelicula.numExemplars]
    );
    return resultado[0].insertId;
}
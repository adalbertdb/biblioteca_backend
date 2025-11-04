import e from "express";
import {pool} from "../config/database.js";
import Recurso from "../models/Recurso.js";


export async function getRecursos() {
    const [rows] =  await pool.query("SELECT * FROM vw_recursos");
    return rows;
}

export async function getRecursoById(id) {
    const [rows] = await pool.query("SELECT * FROM recursos WHERE id = ?", [id]);
    return rows[0];
}

export async function updateRecurso(recurso){
    //TO-DO
}

export async function deleteRecurso(id) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute("DELETE FROM prestamos WHERE id_recurso = ?", [id]);

        const [rows] = await connection.query("SELECT tipo FROM recursos WHERE id = ?", [id]);
        if (rows.length === 0) {
            await connection.commit();
            return { affectedRows: 0 };
        }
        const tipo = rows[0].tipo;

        if (tipo === 1) {
            await connection.execute("DELETE FROM libros WHERE id = ?", [id]);
        } else if (tipo === 2) {
            await connection.execute("DELETE FROM peliculas WHERE id = ?", [id]);
        } else if (tipo === 3) {
            await connection.execute("DELETE FROM revistas WHERE id = ?", [id]);
        }

        const [result] = await connection.execute("DELETE FROM recursos WHERE id = ?", [id]);

        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
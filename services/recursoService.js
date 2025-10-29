import e from "express";
import {pool} from "../config/database.js";
import Recurso from "../models/Recurso.js";


export async function getRecursos() {
    const [rows] =  await pool.query("SELECT * FROM recursos");
    return rows;
}

export async function getRecursoById(id) {
    const [rows] = await pool.query("SELECT * FROM recursos WHERE id = ?", [id]);
    return rows[0];
}

export async function createRecurso(recurso) {
    const resultado = await pool.query(
        "INSERT INTO recursos (titulo, tipo, autor) VALUES (?, ?, ?)",
        [recurso.titulo, recurso.tipo, recurso.autor]
    );
    return resultado[0];
}
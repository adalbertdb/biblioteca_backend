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

export async function updateRecurso(recurso){
    const actualizacion = await pool.query(
        "UPDATE "
    )
}
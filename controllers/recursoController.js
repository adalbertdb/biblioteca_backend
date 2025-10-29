import Recurso from "../models/Recurso.js";
import * as recursoService from "../services/recursoService.js";

// Controlador para obtener todos los recursos
export async function getRecursos(req, res) {
    try {
        const recursos = await recursoService.getRecursos();
        res.json(recursos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los recursos" });
    }
}

// Controlador para obtener un recurso por su ID
export async function getRecursoById(req, res) {
    const id = req.params.id;
    try {
        const recurso = await recursoService.getRecursoById(id);
        if (recurso) {
            res.json(recurso);
        } else {
            res.status(404).json({ error: "Recurso no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el recurso" });
    }
}

export async function createRecurso(req, res) {
    const { titulo, tipo, autor } = req.body;
    try {
        const nuevoRecurso = new Recurso(titulo, tipo, autor);
        const resultado = await recursoService.createRecurso(nuevoRecurso);
        res.status(201).json({ id: resultado.insertId, ...nuevoRecurso });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el recurso" });
    }
}

export async function updateRecurso(req, res) {
    const id = req.params.id;
    const { titulo, tipo, autor, anio } = req.body;
    try {
        const recursoActualizado = new Recurso(titulo, tipo, autor, anio);
        const resultado = await recursoService.updateRecurso(id, recursoActualizado);
        if (resultado.affectedRows > 0) {
            res.json({ id, ...recursoActualizado });
        } else {
            res.status(404).json({ error: "Recurso no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el recurso" });
    }
}

export async function deleteRecurso(req, res) {
    const id = req.params.id;
    try {
        const resultado = await recursoService.deleteRecurso(id);
        if (resultado.affectedRows > 0) {
            res.json({ message: "Recurso eliminado correctamente" });
        } else {
            res.status(404).json({ error: "Recurso no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el recurso" });
    }
}
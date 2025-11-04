import * as LibroService from "../services/libroService.js";

export async function getLibros(req, res) {
    try {
        const libros = await LibroService.getLibros();
        res.json(libros);
    } catch (error) {
        res.status(500).json({error: "Error retrieving libros"});
    }
}

export async function getLibroById(req, res) {
    const id = req.params.id;
    try {
        const libro = await LibroService.getLibroById(id);
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).json({error: "Libro not found"});
        }
    } catch (error) {
        res.status(500).json({error: "Error retrieving libro"});
    }
}

export async function createLibro(req, res) {
    try {
        const libro = await LibroService.createLibro(req.body);
        res.status(201).json(libro)
    } catch (error) {
        console.log("error al crear libro",error);
        res.status(500).json({error:"Error al intentar cear libro"})
    }
}

export async function updateLibro(req, res) {
    const id = req.params.id;
    try {
        const libro = await LibroService.updateLibro(id, req.body);
        res.json(libro);
    } catch (error) {
        res.status(500).json({error: "Error updating libro"});
    }
}

export async function deleteLibro(req, res) {
    const id = req.params.id;
    try {
        await LibroService.deleteLibro(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: "Error deleting libro"});
    }
}

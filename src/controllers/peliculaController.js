import * as PeliculaService from "../services/peliculaService.js";

export async function getPeliculas(req, res) {
    try {
        const peliculas = await PeliculaService.getPeliculas();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({error: "Error retrieving peliculas"});
    }
}

export async function getPeliculaById(req, res) {
    const id = req.params.id;
    try {
        const pelicula = await PeliculaService.getPeliculaById(id);
        if (pelicula) {
            res.json(pelicula);
        } else {
            res.status(404).json({error: "Pelicula not found"});
        }
    } catch (error) {
        res.status(500).json({error: "Error retrieving pelicula"});
    }
}

export async function createPelicula(req, res) {
    try {
        console.log("Request body:", req.body);
        if (!req.body) {
            return res.status(400).json({ error: "Request body is missing" });
        }
        const pelicula = await PeliculaService.createPelicula(req.body);
        res.status(201).json(pelicula)
    } catch (error) {
        console.log("error al crear pelicula",error);
        res.status(500).json({error:"Error al intentar cear pelicula"})
    }
}

export async function updatePelicula(req, res) {
    const id = req.params.id;
    try {
        const pelicula = await PeliculaService.updatePelicula(id, req.body);
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({error: "Error updating pelicula"});
    }
}

export async function deletePelicula(req, res) {
    const id = req.params.id;
    try {
        await PeliculaService.deletePelicula(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: "Error deleting pelicula"});
    }
}

import PeliculaService from "../services/peliculaService";

export async function getPeliculas(req, res) {
    try {
        const peliculas = await PeliculaService.getPeliculas();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({error: "Error retrieving peliculas"});
    }
}

/* export async function getPeliculaById(req, res) {
    const id = req.params.id;
    try {
        const pelicula = await Pelicula.getPeliculaById(id);
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
    const { titol, director, genere, numExemplars } = req.body;
    const nuevaPelicula = new Pelicula(titol, director, genere, numExemplars);
    try {
        const id = await Pelicula.createPelicula(nuevaPelicula);
        res.status(201).json({id, ...nuevaPelicula});
    } catch (error) {
        res.status(500).json({error: "Error creating pelicula"});
    }
}

export async function updatePelicula(req, res) {
    const id = req.params.id;
    const { titol, director, genere, numExemplars } = req.body;
    const updatedPelicula = new Pelicula(titol, director, genere, numExemplars);
    try {
        await Pelicula.updatePelicula(id, updatedPelicula);
        res.json({id, ...updatedPelicula});
    } catch (error) {
        res.status(500).json({error: "Error updating pelicula"});
    }
}

export async function deletePelicula(req, res) {
    const id = req.params.id;
    try {
        await Pelicula.deletePelicula(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({error: "Error deleting pelicula"});
    }
} */
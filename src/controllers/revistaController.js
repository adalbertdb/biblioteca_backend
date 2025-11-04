import * as RevistaService from "../services/revistaService.js";

export async function getRevistas(req, res) {
    try {
        const revistas = await RevistaService.getRevistas();
        res.json(revistas);
    } catch (error) {
        res.status(500).json({error: "Error retrieving revistas"});
    }
}

export async function getRevistaById(req, res) {
    const id = req.params.id;
    try {
        const revista = await RevistaService.getRevistaById(id);
        if (revista) {
            res.json(revista);
        } else {
            res.status(404).json({error: "Revista not found"});
        }
    } catch (error) {
        res.status(500).json({error: "Error retrieving revista"});
    }
}

export async function createRevista(req, res) {
    try {
        const revista = await RevistaService.createRevista(req.body);
        res.status(201).json(revista)
    } catch (error) {
        console.log("error al crear revista",error);
        res.status(500).json({error:"Error al intentar cear revista"})
    }
}

export async function updateRevista(req, res) {
    const id = req.params.id;
    try {
        const revista = await RevistaService.updateRevista(id, req.body);
        res.json(revista);
    } catch (error) {
        res.status(500).json({error: "Error updating revista"});
    }
}

export async function deleteRevista(req, res) {
    const id = req.params.id;
    try {
        await RevistaService.deleteRevista(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: "Error deleting revista"});
    }
}

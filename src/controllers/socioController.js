import * as SocioService from "../services/socioService.js";

export async function getSocios(req, res) {
    try {
        const socios = await SocioService.getSocios();
        res.json(socios);
    } catch (error) {
        res.status(500).json({error: "Error retrieving socios"});
    }
}

export async function getSocioById(req, res) {
    const id = req.params.id;
    try {
        const socio = await SocioService.getSocioById(id);
        if (socio) {
            res.json(socio);
        } else {
            res.status(404).json({error: "Socio not found"});
        }
    } catch (error) {
        res.status(500).json({error: "Error retrieving socio"});
    }
}

export async function createSocio(req, res) {
    try {
        const socio = await SocioService.createSocio(req.body);
        res.status(201).json(socio)
    } catch (error) {
        console.log("error al crear socio",error);
        res.status(500).json({error:"Error al intentar crear socio"})
    }
}

export async function updateSocio(req, res) {
    const id = req.params.id;
    try {
        const socio = await SocioService.updateSocio(id, req.body);
        res.json(socio);
    } catch (error) {
        res.status(500).json({error: "Error updating socio"});
    }
}

export async function deleteSocio(req, res) {
    const id = req.params.id;
    try {
        await SocioService.deleteSocio(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: "Error deleting socio"});
    }
}

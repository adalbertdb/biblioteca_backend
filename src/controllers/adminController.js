import * as AdminService from "../services/adminService.js";

export async function getAdmins(req, res) {
    try {
        const admins = await AdminService.getAdmins();
        res.json(admins);
    } catch (error) {
        res.status(500).json({error: "Error retrieving admins"});
    }
}

export async function getAdminById(req, res) {
    const id = req.params.id;
    try {
        const admin = await AdminService.getAdminById(id);
        if (admin) {
            res.json(admin);
        } else {
            res.status(404).json({error: "Admin not found"});
        }
    } catch (error) {
        res.status(500).json({error: "Error retrieving admin"});
    }
}

export async function createAdmin(req, res) {
    try {
        const admin = await AdminService.createAdmin(req.body);
        res.status(201).json(admin)
    } catch (error) {
        console.log("error al crear admin",error);
        res.status(500).json({error:"Error al intentar crear admin"})
    }
}

export async function updateAdmin(req, res) {
    const id = req.params.id;
    try {
        const admin = await AdminService.updateAdmin(id, req.body);
        res.json(admin);
    } catch (error) {
        res.status(500).json({error: "Error updating admin"});
    }
}

export async function deleteAdmin(req, res) {
    const id = req.params.id;
    try {
        await AdminService.deleteAdmin(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: "Error deleting admin"});
    }
}

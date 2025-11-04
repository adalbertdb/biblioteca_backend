import {pool} from "../config/database.js";

export async function getAdmins() {
    const [rows] =  await pool.query("SELECT * FROM vw_admins");
    return rows;
}

export async function getAdminById(id) {
    const [rows] =  await pool.query("SELECT * FROM vw_admins WHERE id = ?", [id]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}

export async function createAdmin(admin) {
    const { dni, nombre, id_cargo } = admin;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [resultUsuario] = await connection.execute(
            "INSERT INTO usuarios (dni, nombre, tipo_usuario) VALUES (?, ?, 'administrador')",
            [dni, nombre]
        );
        const idUsuario = resultUsuario.insertId;

        await connection.execute(
            "INSERT INTO administradores (id, id_cargo) VALUES (?, ?)",
            [idUsuario, id_cargo]
        );

        await connection.commit();
        return { id: idUsuario, ...admin };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function updateAdmin(id, admin) {
    const { dni, nombre, id_cargo } = admin;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute(
            "UPDATE usuarios SET dni = ?, nombre = ? WHERE id = ?",
            [dni, nombre, id]
        );

        await connection.execute(
            "UPDATE administradores SET id_cargo = ? WHERE id = ?",
            [id_cargo, id]
        );

        await connection.commit();
        return { id, ...admin };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function deleteAdmin(id) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute("DELETE FROM prestamos WHERE id_admin = ?", [id]);
        await connection.execute("DELETE FROM administradores WHERE id = ?", [id]);
        await connection.execute("DELETE FROM usuarios WHERE id = ?", [id]);

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

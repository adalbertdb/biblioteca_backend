import {pool} from "../config/database.js";

export async function getSocios() {
    const [rows] =  await pool.query("SELECT * FROM vw_socios");
    return rows;
}

export async function getSocioById(id) {
    const [rows] =  await pool.query("SELECT * FROM vw_socios WHERE id = ?", [id]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}

export async function createSocio(socio) {
    const { dni, nombre } = socio;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [resultUsuario] = await connection.execute(
            "INSERT INTO usuarios (dni, nombre, tipo_usuario) VALUES (?, ?, 'socio')",
            [dni, nombre]
        );
        const idUsuario = resultUsuario.insertId;

        await connection.execute(
            "INSERT INTO socios (id) VALUES (?)",
            [idUsuario]
        );

        await connection.commit();
        return { id: idUsuario, ...socio };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function updateSocio(id, socio) {
    const { dni, nombre } = socio;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute(
            "UPDATE usuarios SET dni = ?, nombre = ? WHERE id = ?",
            [dni, nombre, id]
        );

        await connection.commit();
        return { id, ...socio };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function deleteSocio(id) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute("DELETE FROM prestamos WHERE id_socio = ?", [id]);
        await connection.execute("DELETE FROM socios WHERE id = ?", [id]);
        await connection.execute("DELETE FROM usuarios WHERE id = ?", [id]);

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

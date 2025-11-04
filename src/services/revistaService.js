import {pool} from "../config/database.js";

export async function getRevistas() {
    const [rows] =  await pool.query("SELECT * FROM vw_revistas");
    return rows;
}

export async function getRevistaById(id) {
    const [rows] =  await pool.query("SELECT * FROM vw_revistas WHERE id = ?", [id]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}

export async function createRevista(revista) {
    const { titulo, num_ejemplares, fecha_publicacion } = revista;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [resultRecurso] = await connection.execute(
            "INSERT INTO recursos (tipo, titulo, num_ejemplares) VALUES (?, ?, ?)",
            [3, titulo, num_ejemplares]
        );
        const idRecurso = resultRecurso.insertId;

        await connection.execute(
            "INSERT INTO revistas (id, fecha_publicacion) VALUES (?, ?)",
            [idRecurso, fecha_publicacion]
        );

        await connection.commit();
        return { id: idRecurso, ...revista };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function updateRevista(id, revista) {
    const { titulo, num_ejemplares, fecha_publicacion } = revista;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute(
            "UPDATE recursos SET titulo = ?, num_ejemplares = ? WHERE id = ?",
            [titulo, num_ejemplares, id]
        );

        await connection.execute(
            "UPDATE revistas SET fecha_publicacion = ? WHERE id = ?",
            [fecha_publicacion, id]
        );

        await connection.commit();
        return { id, ...revista };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function deleteRevista(id) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute("DELETE FROM revistas WHERE id = ?", [id]);
        await connection.execute("DELETE FROM recursos WHERE id = ?", [id]);

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

import {pool} from "../config/database.js";

export async function getLibros() {
    const [rows] =  await pool.query("SELECT * FROM vw_libros");
    return rows;
}

export async function getLibroById(id) {
    const [rows] =  await pool.query("SELECT * FROM vw_libros WHERE id = ?", [id]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}

export async function createLibro(libro) {
    const { titulo, num_ejemplares, autor } = libro;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [resultRecurso] = await connection.execute(
            "INSERT INTO recursos (tipo, titulo, num_ejemplares) VALUES (?, ?, ?)",
            [1, titulo, num_ejemplares]
        );
        const idRecurso = resultRecurso.insertId;

        await connection.execute(
            "INSERT INTO libros (id, autor) VALUES (?, ?)",
            [idRecurso, autor]
        );

        await connection.commit();
        return { id: idRecurso, ...libro };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function updateLibro(id, libro) {
    const { titulo, num_ejemplares, autor } = libro;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute(
            "UPDATE recursos SET titulo = ?, num_ejemplares = ? WHERE id = ?",
            [titulo, num_ejemplares, id]
        );

        await connection.execute(
            "UPDATE libros SET autor = ? WHERE id = ?",
            [autor, id]
        );

        await connection.commit();
        return { id, ...libro };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function deleteLibro(id) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute("DELETE FROM libros WHERE id = ?", [id]);
        await connection.execute("DELETE FROM recursos WHERE id = ?", [id]);

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

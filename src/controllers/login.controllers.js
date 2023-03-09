import { pool } from "../db.js";

// ---------------------------------------------------------}


export const buscarUsuario = async (req, res) => {
    const { usuario, contraseña } = req.body;
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?", [usuario, contraseña]);
    if(rows.length > 0){
        res.render("index", { usuario: rows[0] });
    } else {
        res.redirect("/");
    }
};
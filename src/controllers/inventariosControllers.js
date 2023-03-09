import { pool } from "../db.js";

// ---------------------------------------------------------
export const renderInventarios= async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM sangre_disponibles");
 res.render("inventario", { inventario: rows, columnas: ["volumen_total","grupo", "RH"] });
// const [rows] = await pool.query("SELECT * FROM inventario");
// res.render("inventario", { inventario: rows });
};


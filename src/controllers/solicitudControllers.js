import { pool } from "../db.js";

// ---------------------------------------------------------
export const renderSolicitudes= async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM solicitudes");
  res.render("solicitudes", { solicitud: rows });
};

export const renderSolicitudByGrupo = async (req, res) => {
  const grupo = req.body.grupoBuscado;
  const [rows] = await pool.query("SELECT * FROM solicitudes USE INDEX (idx_grupoSolicitud) WHERE grupo = ?",[grupo]);
  res.render('solicitud', { solicitud: rows });
}



export const createSolicitudes = async (req, res) => {
  const newCustomer = req.body;
  await pool.query("INSERT INTO solicitudes set ?", [newCustomer]);
  res.redirect("/solicitudes");
};

export const editSolicitudes = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query("SELECT * FROM solicitudes WHERE id = ?", [
    id,
  ]);
  res.render("solicitudes_edit", { solicitud: result[0] });
};

export const updateSolicitudes = async (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  await pool.query("UPDATE solicitudes set ? WHERE id = ?", [newCustomer, id]);
  res.redirect("/solicitudes");
};

export const deleteSolicitudes= async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM solicitudes WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Customer deleted" });
  }
  res.redirect("/solicitudes");
};
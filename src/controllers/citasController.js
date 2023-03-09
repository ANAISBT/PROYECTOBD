import { pool } from "../db.js";

export const renderCitas = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM citas");
  res.render("citas", { citas: rows });
};

export const createCitas = async (req, res) => {
  const newCustomer = req.body;
  await pool.query("INSERT INTO citas set ?", [newCustomer]);
  res.redirect("/citas");
};

export const editCitas = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query("SELECT * FROM citas WHERE id = ?", [
    id,
  ]);
  res.render("citas_edit", { citas: result[0] });
};

export const updateCitas = async (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  await pool.query("UPDATE citas set ? WHERE id = ?", [newCustomer, id]);
  res.redirect("/citas");
};

export const deleteCitas = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM citas WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Customer deleted" });
  }
  res.redirect("/citas");
};
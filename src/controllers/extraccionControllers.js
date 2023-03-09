import { pool } from "../db.js";

// ---------------------------------------------------------
export const renderExtractions= async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM extracciones");
  res.render("extraccion", { extraccion: rows });
};

export const createExtractions = async (req, res) => {
  const newCustomer = req.body;
  await pool.query("INSERT INTO extracciones SET ?", [newCustomer]);
  res.redirect("/extracciones");
};

export const editExtraction = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query("SELECT * FROM extracciones WHERE id = ?", [
    id,
  ]);
  res.render("extraccion_edit", { extraccion: result[0] });
};

export const updateExtraction = async (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  await pool.query("UPDATE extracciones set ? WHERE id = ?", [newCustomer, id]);
  res.redirect("/extracciones");
};

export const deleteExtraction = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM extracciones WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Customer deleted" });
  }
  res.redirect("/extracciones");
};
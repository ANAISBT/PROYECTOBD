import { pool } from "../db.js";

export const renderCustomers = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM donantes");
  res.render("donantes", { donantes: rows });
};

export const createCustomers = async (req, res) => {
  const newCustomer = req.body;
  await pool.query("INSERT INTO donantes set ?", [newCustomer]);
  res.redirect("/donantes");
};

export const editCustomer = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query("SELECT * FROM donantes WHERE id = ?", [
    id,
  ]);
  res.render("donantes_edit", { donante: result[0] });
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  await pool.query("UPDATE donantes set ? WHERE id = ?", [newCustomer, id]);
  res.redirect("/donantes");
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM donantes WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Customer deleted" });
  }
  res.redirect("/donantes");
};
// ---------------------------------------------------------
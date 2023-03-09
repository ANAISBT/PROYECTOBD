import {
  createCustomers,
  deleteCustomer,
  editCustomer,
  renderCustomers,
  updateCustomer,
} from "../controllers/customerController.js";

import { Router } from "express";

const router = Router();

router.get("/", renderCustomers);
router.post("/add", createCustomers);
router.get("/update/:id", editCustomer);
router.post("/update/:id", updateCustomer);
router.get("/delete/:id", deleteCustomer);


export default router;

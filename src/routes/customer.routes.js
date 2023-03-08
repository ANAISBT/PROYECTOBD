import {
  createCustomers,
  createExtractions,
  deleteCustomer,
  deleteExtraction,
  editCustomer,
  editExtraction,
  renderCustomers,
  renderExtractions,
  updateCustomer,
  updateExtraction
} from "../controllers/customerController.js";

import { Router } from "express";

const router = Router();

router.get("/donantes", renderCustomers);
router.post("/donantes/add", createCustomers);
router.get("/donantes/update/:id", editCustomer);
router.post("/donantes/update/:id", updateCustomer);
router.get("/donantes/delete/:id", deleteCustomer);

router.get("/extracciones", renderExtractions);
router.post("/extracciones/add", createExtractions);
router.get("/extracciones/update/:id", editExtraction);
router.post("/extracciones/update/:id", updateExtraction);
router.get("/extracciones/delete/:id", deleteExtraction);




export default router;

import {
    createExtractions,
    deleteExtraction,
    editExtraction,
    renderExtractions,
    updateExtraction
} from "../controllers/extraccionControllers.js";

import { Router } from "express";

const router = Router();
  
  router.get("/", renderExtractions);
  router.post("/add", createExtractions);
  router.get("/update/:id", editExtraction);
  router.post("/update/:id", updateExtraction);
  router.get("/delete/:id", deleteExtraction);
  
  
  export default router;
  
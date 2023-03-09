import {
    createCitas,
    deleteCitas,
    editCitas,
    renderCitas,
    updateCitas,
} from "../controllers/citasController.js";

import { Router } from "express";

const router = Router();
  
  router.get("/", renderCitas);
  router.post("/add", createCitas);
  router.get("/update/:id", editCitas);
  router.post("/update/:id", updateCitas);
  router.get("/delete/:id", deleteCitas);
  
  
  export default router;
  
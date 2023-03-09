import {
    createSolicitudes,
    deleteSolicitudes,
    editSolicitudes,
    renderSolicitudByGrupo,
    renderSolicitudes,
    updateSolicitudes
} from "../controllers/solicitudControllers.js";

import { Router } from "express";

const router = Router();
  
  router.get("/", renderSolicitudes);
  router.post("/byGroup", renderSolicitudByGrupo);
  router.post("/add", createSolicitudes);
  router.get("/update/:id", editSolicitudes);
  router.post("/update/:id", updateSolicitudes);
  router.get("/delete/:id", deleteSolicitudes);
  
  
  export default router;
  
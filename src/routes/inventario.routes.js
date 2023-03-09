import { Router } from "express";
import {
    renderInventarios,
} from "../controllers/inventariosControllers.js";

const router = Router();
  
  router.get("/", renderInventarios);
  
  
  export default router;
  
import { Router } from "express";
import {
    buscarUsuario,
} from "../controllers/login.controllers.js";

const router = Router();
  router.post("/index", buscarUsuario);
  
  
  export default router;
  
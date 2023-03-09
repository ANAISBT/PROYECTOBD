import citasRoutes from './routes/citas.routes.js';
import customerRoutes from "./routes/donantes.routes.js";
import express from "express";
import extraccionRoutes from './routes/extraccion.routes.js';
import { fileURLToPath } from "url";
import inventarioRoutes from './routes/inventario.routes.js';
import loginRoutes from './routes/login.routes.js';
import morgan from "morgan";
import path from "path";
import solicitudesRoutes from './routes/solicitudes.routes.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
    res.render("login",{});
});
app.use('/donantes',customerRoutes);
app.use('/extracciones',extraccionRoutes);
app.use('/solicitudes',solicitudesRoutes);
app.use('/inventario',inventarioRoutes);
app.use('/citas',citasRoutes);
app.use(loginRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
export default app;

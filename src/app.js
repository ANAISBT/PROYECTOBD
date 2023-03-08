import customerRoutes from "./routes/customer.routes.js";
import express from "express";
import { fileURLToPath } from "url";
import morgan from "morgan";
import path from "path";

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
    res.render("index",{});
});
app.use(customerRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
export default app;

import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors"

// Importing Routes
import { AdminRoutes, AppointmentRoutes, GalleryRoutes } from "./api/routes";
import { errorMiddleware } from "./api/middlewares";


// All the Instances
const app = express()

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("Hello world")
})

// All the Routes
app.use("/api/v1/admin", AdminRoutes);
app.use("/api/v1/gallery", GalleryRoutes);
app.use("/api/v1/appointment", AppointmentRoutes)

app.use(errorMiddleware)

export default app;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// Importing Routes
const routes_1 = require("./api/routes");
const middlewares_1 = require("./api/middlewares");
const config_1 = require("./config");
// All the Instances
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: [config_1.ENV.FRONTEND_URL, config_1.ENV.FRONTEND_URL1],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.get("/", (req, res) => {
    res.send("Hello world");
});
// All the Routes
app.use("/api/v1/admin", routes_1.AdminRoutes);
app.use("/api/v1/gallery", routes_1.GalleryRoutes);
app.use("/api/v1/appointment", routes_1.AppointmentRoutes);
app.use(middlewares_1.errorMiddleware);
exports.default = app;

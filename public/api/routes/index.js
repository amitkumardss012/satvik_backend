"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryRoutes = exports.AppointmentRoutes = exports.AdminRoutes = void 0;
const admin_routes_1 = __importDefault(require("./admin.routes"));
exports.AdminRoutes = admin_routes_1.default;
const appointment_routes_1 = __importDefault(require("./appointment.routes"));
exports.AppointmentRoutes = appointment_routes_1.default;
const gallery_routes_1 = __importDefault(require("./gallery.routes"));
exports.GalleryRoutes = gallery_routes_1.default;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.deleteById = exports.getById = exports.create = void 0;
const config_1 = require("../../config");
const types_1 = require("../../types/types");
const middlewares_1 = require("../middlewares");
const appointment_service_1 = __importDefault(require("../services/appointment.service"));
const response_util_1 = require("../utils/response.util");
const validators_1 = require("../validators");
exports.create = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, subject, message } = validators_1.appointmentValidator.parse(req.body);
    const appointment = yield appointment_service_1.default.createAppointment({
        name,
        email,
        phone,
        subject,
        message,
        isRead: false,
    });
    return (0, response_util_1.SuccessResponse)(res, "Appointment created successfully", appointment, types_1.statusCode.Created);
}));
exports.getById = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (isNaN(id) || !id)
        return next(new response_util_1.ErrorResponse("Invalid ID", types_1.statusCode.Bad_Request));
    const appointment = yield appointment_service_1.default.getAppointmentById(id);
    if (!appointment)
        return next(new response_util_1.ErrorResponse("Appointment not found", types_1.statusCode.Not_Found));
    if (!appointment.isRead)
        yield appointment_service_1.default.markAsRead(id);
    return (0, response_util_1.SuccessResponse)(res, "Appointment fetched successfully", appointment, types_1.statusCode.OK);
}));
exports.deleteById = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (isNaN(id) || !id)
        return next(new response_util_1.ErrorResponse("Invalid ID", types_1.statusCode.Bad_Request));
    const deletedAppointment = yield appointment_service_1.default.deleteAppointmentById(id);
    if (!deletedAppointment)
        return next(new response_util_1.ErrorResponse("Appointment not found", types_1.statusCode.Not_Found));
    return (0, response_util_1.SuccessResponse)(res, "Appointment deleted successfully", deletedAppointment, types_1.statusCode.OK);
}));
exports.getAll = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // **Run count & fetch queries in parallel for better performance**
    const [appointments] = yield Promise.all([
        config_1.prisma.appointment.findMany({
            orderBy: [
                { isRead: "asc" }, // Unread first
                { createdAt: "desc" }, // Newest first
            ],
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                subject: true,
                message: true,
                isRead: true,
                createdAt: true,
            },
        }),
    ]);
    // **Optimized response structure**
    return res.status(200).json({
        success: true,
        message: "Appointments fetched successfully",
        data: appointments,
    });
}));

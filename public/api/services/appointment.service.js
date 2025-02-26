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
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
class AppointmentService {
    static createAppointment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield config_1.prisma.appointment.create({
                data,
            });
            return appointment;
        });
    }
    static getAllAppointments() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            const appointments = yield config_1.prisma.appointment.findMany({
                take: limit,
                skip: (page - 1) * limit,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    subject: true,
                    isRead: true,
                    message: true,
                },
                orderBy: [
                    { isRead: "asc" }, // ✅ Unread (`false`) first
                    { createdAt: "desc" }, // ✅ Newest first within unread/read groups
                ],
            });
            return appointments;
        });
    }
    static deleteAppointmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield config_1.prisma.appointment.delete({
                where: {
                    id,
                },
                select: {
                    id: true,
                },
            });
            return appointment;
        });
    }
    static getAppointmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield config_1.prisma.appointment.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    subject: true,
                    message: true,
                    isRead: true,
                },
            });
            return appointment;
        });
    }
    static markAsRead(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield config_1.prisma.appointment.update({
                where: {
                    id,
                },
                data: {
                    isRead: true,
                },
            });
            return appointment;
        });
    }
}
exports.default = AppointmentService;

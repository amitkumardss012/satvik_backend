"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentValidator = void 0;
const zod_1 = require("zod");
exports.appointmentValidator = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .trim(),
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .max(255, "Email must not exceed 255 characters")
        .trim(),
    phone: zod_1.z
        .string()
        .trim()
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits and contain only digits"),
    subject: zod_1.z
        .string()
        .min(5, "Subject must be at least 5 characters")
        .max(255, "Subject must not exceed 255 characters")
        .trim(),
    message: zod_1.z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Message must not exceed 2000 characters")
        .trim(),
    isRead: zod_1.z.boolean().default(false), // Tracks if the appointment is read (default: false)
});
exports.default = exports.appointmentValidator;

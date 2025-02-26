import { z } from "zod";

export const appointmentValidator = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim(),

  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email must not exceed 255 characters")
    .trim(),

  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits and contain only digits"),

  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(255, "Subject must not exceed 255 characters")
    .trim(),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters")
    .trim(),

  isRead: z.boolean().default(false), // Tracks if the appointment is read (default: false)
});

export default appointmentValidator;

export type AppointmentType = z.infer<typeof appointmentValidator>;
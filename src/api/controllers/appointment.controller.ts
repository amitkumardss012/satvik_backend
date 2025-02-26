import { prisma } from "../../config";
import { statusCode } from "../../types/types";
import { asyncHandler } from "../middlewares";
import AppointmentService from "../services/appointment.service";
import { ErrorResponse, SuccessResponse } from "../utils/response.util";
import { appointmentValidator } from "../validators";

export const create = asyncHandler(async (req, res, next) => {
  const { name, email, phone, subject, message } = appointmentValidator.parse(
    req.body
  );

  const appointment = await AppointmentService.createAppointment({
    name,
    email,
    phone,
    subject,
    message,
    isRead: false,
  });
  return SuccessResponse(
    res,
    "Appointment created successfully",
    appointment,
    statusCode.Created
  );
});


export const getById = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id) || !id)
    return next(new ErrorResponse("Invalid ID", statusCode.Bad_Request));
  const appointment = await AppointmentService.getAppointmentById(id);
  if (!appointment)
    return next(
      new ErrorResponse("Appointment not found", statusCode.Not_Found)
    );
  if (!appointment.isRead) await AppointmentService.markAsRead(id);
  return SuccessResponse(
    res,
    "Appointment fetched successfully",
    appointment,
    statusCode.OK
  );
});

export const deleteById = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id) || !id)
    return next(new ErrorResponse("Invalid ID", statusCode.Bad_Request));
  const deletedAppointment = await AppointmentService.deleteAppointmentById(id);
  if (!deletedAppointment)
    return next(
      new ErrorResponse("Appointment not found", statusCode.Not_Found)
    );
  return SuccessResponse(
    res,
    "Appointment deleted successfully",
    deletedAppointment,
    statusCode.OK
  );
});


export const getAll = asyncHandler(async (req, res, next) => {
  
    // **Run count & fetch queries in parallel for better performance**
    const [appointments] = await Promise.all([
      prisma.appointment.findMany({
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
  });
  
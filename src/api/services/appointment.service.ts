import { prisma } from "../../config";
import { AppointmentType } from "../validators";

class AppointmentService {
  public static async createAppointment(data: AppointmentType) {
    const appointment = await prisma.appointment.create({
      data,
    });
    return appointment;
  }

  public static async getAllAppointments(page: number = 1, limit: number = 10) {
    const appointments = await prisma.appointment.findMany({
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
  }

  public static async deleteAppointmentById(id: number) {
    const appointment = await prisma.appointment.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    return appointment;
  }

  public static async getAppointmentById(id: number) {
    const appointment = await prisma.appointment.findUnique({
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
  }

  public static async markAsRead(id: number) {
    const appointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
    return appointment;
  }
}

export default AppointmentService;

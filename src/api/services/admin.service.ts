import { prisma } from "../../config";
import { AdminType } from "../validators";

class AdminService {
    public static async createAdmin(data: AdminType) {
        const admin = await prisma.admin.create({
            data
        })
        return admin
    }

    public static async getAdminByEmail(email: string) {
        const admin = await prisma.admin.findUnique({
            where: {
                email
            },select: {
                id: true,
                email: true,
                role: true,
                password: true
            }
        })
        return admin
    }

    public static async getAdminById(id: number) {
        if (!id) {
            throw new Error("Admin ID is required OR invalid ID"); // ✅ Prevents invalid query
          }
        const admin = await prisma.admin.findUnique({
            where: {
                id
            }, select: {
                id: true,
                email: true,
                role: true,
                password: true
            }
        })
        return admin
    }

    public static async getAllAdmins() {
        const admins = await prisma.admin.findMany({
            select: {
                id: true,
                email: true,
                role: true,
            }
        })
        return admins
    }
}

export default AdminService;
import { prisma } from "../../config"
import { galleryType } from "../validators/gallery.validator"

class GalleryService {
    public static async CreateGallery(title: string, image: string) {
        const gallery = await prisma.gallery.create({
            data: {
                title,
                image
            }
        })
        return gallery
    }

    public static async GetAllGallery() {
        const gallery = await prisma.gallery.findMany({
            select: {
                id: true,
                title: true,
                image: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return gallery
    }

    public static async DeleteGalleryById(id: number) {
        const gallery = await prisma.gallery.delete({
            where: {
                id
            }, select: {id: true}
        })
        return gallery
    }
}

export default GalleryService;
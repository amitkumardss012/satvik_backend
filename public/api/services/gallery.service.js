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
class GalleryService {
    static CreateGallery(title, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const gallery = yield config_1.prisma.gallery.create({
                data: {
                    title,
                    image
                }
            });
            return gallery;
        });
    }
    static GetAllGallery() {
        return __awaiter(this, void 0, void 0, function* () {
            const gallery = yield config_1.prisma.gallery.findMany({
                select: {
                    id: true,
                    title: true,
                    image: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
            return gallery;
        });
    }
    static DeleteGalleryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const gallery = yield config_1.prisma.gallery.delete({
                where: {
                    id
                }, select: { id: true }
            });
            return gallery;
        });
    }
}
exports.default = GalleryService;

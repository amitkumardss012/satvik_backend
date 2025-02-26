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
exports.deleteById = exports.getAll = exports.create = void 0;
const types_1 = require("../../types/types");
const middlewares_1 = require("../middlewares");
const gallery_service_1 = __importDefault(require("../services/gallery.service"));
const response_util_1 = require("../utils/response.util");
exports.create = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image } = req.body;
    console.log(typeof image);
    if (!(title || image))
        return next(new response_util_1.ErrorResponse("title and images are required", types_1.statusCode.Bad_Request));
    const gallery = yield gallery_service_1.default.CreateGallery(title, image);
    return (0, response_util_1.SuccessResponse)(res, "Gallery created successfully", gallery, types_1.statusCode.Created);
}));
exports.getAll = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const gallery = yield gallery_service_1.default.GetAllGallery();
    return (0, response_util_1.SuccessResponse)(res, "Gallery fetched successfully", gallery, types_1.statusCode.OK);
}));
exports.deleteById = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (isNaN(id) || !id)
        return next(new response_util_1.ErrorResponse("Invalid ID", types_1.statusCode.Bad_Request));
    const deletedGallery = yield gallery_service_1.default.DeleteGalleryById(id);
    if (!deletedGallery)
        return next(new response_util_1.ErrorResponse("Gallery not found", types_1.statusCode.Not_Found));
    return (0, response_util_1.SuccessResponse)(res, "Gallery deleted successfully", deletedGallery, types_1.statusCode.OK);
}));

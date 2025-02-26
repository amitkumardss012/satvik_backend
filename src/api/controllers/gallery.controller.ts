import { statusCode } from "../../types/types";
import { asyncHandler } from "../middlewares";
import GalleryService from "../services/gallery.service";
import { ErrorResponse, SuccessResponse } from "../utils/response.util";
import galleryValidator from "../validators/gallery.validator";

export const create = asyncHandler(async (req, res, next) => {
    const { title, image } = req.body;
    console.log(typeof image)
    if(!(title || image)) return next(new ErrorResponse("title and images are required", statusCode.Bad_Request))
    const gallery = await GalleryService.CreateGallery(title, image);
    return SuccessResponse(res, "Gallery created successfully", gallery, statusCode.Created);
});

export const getAll = asyncHandler(async (req, res, next) => {
    const gallery = await GalleryService.GetAllGallery();
    return SuccessResponse(res, "Gallery fetched successfully", gallery, statusCode.OK);
});

export const deleteById = asyncHandler(async (req, res, next) => {
    const id = Number(req.params.id);
    if(isNaN(id) || !id) return next(new ErrorResponse("Invalid ID", statusCode.Bad_Request));

    const deletedGallery = await GalleryService.DeleteGalleryById(id)
    if(!deletedGallery) return next(new ErrorResponse("Gallery not found", statusCode.Not_Found))
    return SuccessResponse(res, "Gallery deleted successfully", deletedGallery, statusCode.OK); 
});
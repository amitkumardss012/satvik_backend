import { Router } from "express";
import { isAdmin } from "../middlewares";
import { GalleryController } from "../controllers";

const gallery = Router();

gallery.use(isAdmin)

gallery.post("/create", GalleryController.create);
gallery.get("/all", GalleryController.getAll);
gallery.delete("/delete/:id", GalleryController.deleteById);

export default gallery;
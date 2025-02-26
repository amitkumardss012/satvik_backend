"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const galleryValidator = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "title is required" })
        .min(2)
        .max(50)
        .trim()
        .nonempty({ message: "Title is required" }),
    image: zod_1.z.string().nonempty({ message: "Image URL is required" }),
});
exports.default = galleryValidator;

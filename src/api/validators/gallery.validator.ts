import { z } from "zod";

const galleryValidator = z.object({
  title: z
    .string({required_error: "title is required"})
    .min(2)
    .max(50)
    .trim()
    .nonempty({ message: "Title is required" }),
  image: z.string().nonempty({ message: "Image URL is required" }),
});


export default galleryValidator;

export type galleryType = z.infer<typeof galleryValidator>;
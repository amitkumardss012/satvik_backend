import { Router } from "express";
import { AdminController } from "../controllers";
import { isAdmin } from "../middlewares";

const admin = Router();
admin.post("/login", AdminController.login)

admin.use(isAdmin)
admin.post("/create", AdminController.create)
admin.post("/logout", AdminController.logout)
admin.get("/all", AdminController.AllAdmin)
admin.get("/logout", AdminController.logout)

export default admin;
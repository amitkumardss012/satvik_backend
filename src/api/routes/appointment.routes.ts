import { Router } from "express";
import { AppointmentController } from "../controllers";
import { isAdmin } from "../middlewares";

const appointment = Router();

appointment.post("/create", AppointmentController.create);

appointment.use(isAdmin)
appointment.get("/all", AppointmentController.getAll);
appointment.route("/:id").get(AppointmentController.getById).delete(AppointmentController.deleteById);

export default appointment;

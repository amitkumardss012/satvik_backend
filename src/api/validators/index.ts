import { ZodError } from "zod";
import AdminValidator, {AdminType} from "./admin.validator";
import appointmentValidator,{AppointmentType} from "./appointment.validator";




export {zodError, AdminValidator, AdminType, appointmentValidator, AppointmentType}


const zodError = (error: ZodError) => {
    let errors: any = {};
    error.errors.map((issue) => {
      const path = issue.path?.[0];
      if (path) errors[path] = issue.message;
    });
    return errors;
  };

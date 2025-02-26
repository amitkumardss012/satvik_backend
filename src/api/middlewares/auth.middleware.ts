import { ENV } from "../../config";
import { statusCode } from "../../types/types";
import { AdminService } from "../services";
import { ErrorResponse, Jwt } from "../utils";
import { AdminType } from "../validators";
import { asyncHandler } from "./error.middleware";

const isAdmin = asyncHandler(async (req, res, next) => {
  // Retrieve token from cookies or Authorization header
  const tokenFromCookie = req.cookies?.token;
  const tokenFromHeader =
    req.headers["authorization"]?.split("Bearer ")[1]?.trim() ||
    req.headers.cookie?.split("=")[1]?.trim();

    const tokenFromHeader2 = req.headers["authorization"]?.split("Bearer ")[1]?.trim();

    console.log("tokenFromCookie", tokenFromCookie,);
    console.log("tokenFromHeader", tokenFromHeader);
    console.log("tokenFromHeader2", tokenFromHeader2);
    ;
  const token = tokenFromCookie || tokenFromHeader || tokenFromHeader2;
  console.log("token", token);

  if (!token)
    return next(
      new ErrorResponse(
        "Not authorized, token missing",
        statusCode.Unauthorized
      )
    );

  let decoded;
  try {
    decoded = Jwt.verifyToken(token) as { id: number };
  } catch (error) {
    return next(
      new ErrorResponse("Invalid or expired token", statusCode.Unauthorized)
    );
  }
  console.log("first decoded", decoded);
  const admin = await AdminService.getAdminById(decoded?.id);

  if (!admin)
    return next(
      new ErrorResponse(
        "Not authorized, admin not found",
        statusCode.Unauthorized
      )
    );

  req.admin = admin;
  next();
});

export default isAdmin;

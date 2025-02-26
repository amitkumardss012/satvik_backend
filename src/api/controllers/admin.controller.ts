import { statusCode } from "../../types/types";
import { asyncHandler } from "../middlewares";
import { AdminService } from "../services";
import { ErrorResponse, Jwt, Password } from "../utils";
import { SuccessResponse } from "../utils/response.util";
import { AdminValidator } from "../validators";

export const create = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = AdminValidator.parse(req.body);

  // Run email check and password hashing in parallel using Promise.all
  const [existingAdmin, hashedPassword] = await Promise.all([
    AdminService.getAdminByEmail(email),
    Password.hashPassword(password),
  ]);

  // If admin exists, stop execution early
  if (existingAdmin) {
    return next(
      new ErrorResponse("Admin already exists", statusCode.Bad_Request)
    );
  }

  // Create the admin
  const admin = await AdminService.createAdmin({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Send response
  return SuccessResponse(res, "Admin created successfully", {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  }, statusCode.Created);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //!  input validation
  if (!email || !password) {
    return next(
      new ErrorResponse(
        "Email and password are required",
        statusCode.Bad_Request
      )
    );
  }


  // **Parallel Execution:** Fetch user & hash password at the same time
  const admin = await AdminService.getAdminByEmail(email);

  //!  check if user exists and verify password
  if (!admin || !(await Password.verifyPassword(password, admin.password))) {
    return next(
      new ErrorResponse("Invalid email or password", statusCode.Unauthorized)
    );
  }

  // **Generate JWT Token**
  const token = Jwt.generateToken({
    id: admin.id,
    email: admin.email,
    role: admin.role,
  });

  //* Send Final Response to client
  res
    .status(statusCode.OK)
    .cookie("token", token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", //? Prevents CSRF
      maxAge: 30 * 24 * 60 * 60 * 1000, //? 30 days expiry
    }).header("Authorization", `Bearer ${token}`)
    .json({
      success: true,
      message: "Login successful",
      token,
      admin,
    });
});

export const AllAdmin = asyncHandler(async (req, res, next) => {
  const admins = await AdminService.getAllAdmins();
  return res.status(statusCode.OK).json({
    success: true,
    message: "Admins fetched successfully",
    admins,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  return res
    .status(statusCode.OK)
    .cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //? Secure in production
      sameSite: "strict", //? Prevent CSRF attacks
      expires: new Date(0),
    })
    .json({
      success: true,
      message: "Logout successful",
    });
});

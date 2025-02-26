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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.AllAdmin = exports.login = exports.create = void 0;
const types_1 = require("../../types/types");
const middlewares_1 = require("../middlewares");
const services_1 = require("../services");
const utils_1 = require("../utils");
const response_util_1 = require("../utils/response.util");
const validators_1 = require("../validators");
exports.create = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = validators_1.AdminValidator.parse(req.body);
    // Run email check and password hashing in parallel using Promise.all
    const [existingAdmin, hashedPassword] = yield Promise.all([
        services_1.AdminService.getAdminByEmail(email),
        utils_1.Password.hashPassword(password),
    ]);
    // If admin exists, stop execution early
    if (existingAdmin) {
        return next(new utils_1.ErrorResponse("Admin already exists", types_1.statusCode.Bad_Request));
    }
    // Create the admin
    const admin = yield services_1.AdminService.createAdmin({
        name,
        email,
        password: hashedPassword,
        role,
    });
    // Send response
    return (0, response_util_1.SuccessResponse)(res, "Admin created successfully", {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
    }, types_1.statusCode.Created);
}));
exports.login = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //!  input validation
    if (!email || !password) {
        return next(new utils_1.ErrorResponse("Email and password are required", types_1.statusCode.Bad_Request));
    }
    // **Parallel Execution:** Fetch user & hash password at the same time
    const admin = yield services_1.AdminService.getAdminByEmail(email);
    //!  check if user exists and verify password
    if (!admin || !(yield utils_1.Password.verifyPassword(password, admin.password))) {
        return next(new utils_1.ErrorResponse("Invalid email or password", types_1.statusCode.Unauthorized));
    }
    // **Generate JWT Token**
    const token = utils_1.Jwt.generateToken({
        id: admin.id,
        email: admin.email,
        role: admin.role,
    });
    //* Send Final Response to client
    res
        .status(types_1.statusCode.OK)
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
}));
exports.AllAdmin = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admins = yield services_1.AdminService.getAllAdmins();
    return res.status(types_1.statusCode.OK).json({
        success: true,
        message: "Admins fetched successfully",
        admins,
    });
}));
exports.logout = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res
        .status(types_1.statusCode.OK)
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
}));

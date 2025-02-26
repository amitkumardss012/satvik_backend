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
const types_1 = require("../../types/types");
const services_1 = require("../services");
const utils_1 = require("../utils");
const error_middleware_1 = require("./error.middleware");
const isAdmin = (0, error_middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    // Retrieve token from cookies or Authorization header
    const tokenFromCookie = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    const tokenFromHeader = ((_c = (_b = req.headers["authorization"]) === null || _b === void 0 ? void 0 : _b.split("Bearer ")[1]) === null || _c === void 0 ? void 0 : _c.trim()) ||
        ((_e = (_d = req.headers.cookie) === null || _d === void 0 ? void 0 : _d.split("=")[1]) === null || _e === void 0 ? void 0 : _e.trim());
    const tokenFromHeader2 = (_g = (_f = req.headers["authorization"]) === null || _f === void 0 ? void 0 : _f.split("Bearer ")[1]) === null || _g === void 0 ? void 0 : _g.trim();
    console.log("tokenFromCookie", tokenFromCookie);
    console.log("tokenFromHeader", tokenFromHeader);
    console.log("tokenFromHeader2", tokenFromHeader2);
    ;
    const token = tokenFromCookie || tokenFromHeader || tokenFromHeader2;
    console.log("token", token);
    if (!token)
        return next(new utils_1.ErrorResponse("Not authorized, token missing", types_1.statusCode.Unauthorized));
    let decoded;
    try {
        decoded = utils_1.Jwt.verifyToken(token);
    }
    catch (error) {
        return next(new utils_1.ErrorResponse("Invalid or expired token", types_1.statusCode.Unauthorized));
    }
    console.log("first decoded", decoded);
    const admin = yield services_1.AdminService.getAdminById(decoded === null || decoded === void 0 ? void 0 : decoded.id);
    if (!admin)
        return next(new utils_1.ErrorResponse("Not authorized, admin not found", types_1.statusCode.Unauthorized));
    req.admin = admin;
    next();
}));
exports.default = isAdmin;

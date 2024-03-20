"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const hashpass_1 = require("../hashpass");
const jwt = __importStar(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const JWT_PASS = process.env.JWT_PASS;
if (!JWT_PASS) {
    throw new Error('JWT secret is undefined. Please check your environment variables.');
}
const SignupSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    username: zod_1.default.string(),
    password: zod_1.default.string().min(6)
});
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedBody = SignupSchema.safeParse(body);
    if (!parsedBody.success) {
        res.status(400);
        return res.json({ msg: "Incorrect credentials" });
    }
    ;
    const userExists = yield prisma.user.findFirst({
        where: {
            email: body.email
        }
    });
    if (userExists) {
        res.status(409);
        return res.json({ msg: "User already exists" });
    }
    const hashedPassword = yield (0, hashpass_1.hashpass)(body.password);
    try {
        const user = yield prisma.user.create({
            data: {
                email: body.email,
                username: body.username,
                password: hashedPassword
            }
        });
        const token = jwt.sign({ id: user.id }, JWT_PASS, { expiresIn: '1h' });
        res.status(200);
        return res.json({ msg: "User created successfully", token: token });
    }
    catch (error) {
        res.status(500);
        return res.json({ msg: "Unexpected error" });
    }
}));
//google auth
const GoogleSignupSchema = zod_1.default.object({
    provider: zod_1.default.string(),
    idToken: zod_1.default.string()
});
userRouter.post("/google-signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedBody = GoogleSignupSchema.safeParse(body);
    if (!parsedBody.success || body.provider.toLowerCase() !== "google") {
        res.status(400);
        return res.json({ msg: "Incorrect credentials" });
    }
    ;
    try {
        const axiosResponse = yield axios_1.default.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDSQJQFTKzLd554vWTvt2A_SrFVmnjGib8", {
            idToken: body.idToken
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const Authdata = axiosResponse.data;
        if (Authdata.users[0].emailVerified === 'false') {
            res.status(400);
            return res.json({ msg: "Unauthorized" });
        }
        const userExists = yield prisma.user.findUnique({
            where: {
                email: Authdata.users[0].email
            }
        });
        if (userExists) {
            const token = jwt.sign({ id: userExists.id }, JWT_PASS, { expiresIn: '1h' });
            res.status(200);
            return res.json({ msg: "Logged in successfully exists", token: token });
        }
        try {
            const user = yield prisma.user.create({
                data: {
                    email: Authdata.users[0].email,
                    username: Authdata.users[0].displayName,
                    provider: body.provider
                }
            });
            const token = jwt.sign({ id: user.id }, JWT_PASS, { expiresIn: '1h' });
            res.status(200);
            return res.json({ msg: "User created successfully", token: token });
        }
        catch (error) {
            console.log(error);
            res.status(500);
            return res.json({ msg: "Unexpected error" });
        }
    }
    catch (error) {
        res.status(403);
        return res.json({ msg: "Unexpected error occured" });
    }
}));
exports.default = userRouter;

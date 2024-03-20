import { Router } from "express";
import express from "express";
import z from 'zod';
import {PrismaClient} from '@prisma/client'
import { hashpass } from "../hashpass";
import * as jwt from 'jsonwebtoken';
import axios from "axios";


const userRouter = Router();

const prisma = new PrismaClient();

const JWT_PASS = process.env.JWT_PASS


if (!JWT_PASS) {
    throw new Error('JWT secret is undefined. Please check your environment variables.');
}

const SignupSchema = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6)
})
userRouter.post("/signup", async (req, res) => {
    const body = req.body

    const parsedBody = SignupSchema.safeParse(body);
    if(!parsedBody.success){
        res.status(400);
        return res.json({msg: "Incorrect credentials"})
    };

    const userExists = await prisma.user.findFirst({
        where: {
            email: body.email
        }
    })
    if(userExists){
        res.status(409);
        return res.json({msg: "User already exists"})
    }

    const hashedPassword = await hashpass(body.password);

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                username: body.username,
                password: hashedPassword
            }
        });

        const token = jwt.sign({id: user.id}, JWT_PASS, {expiresIn: '1h'})

        res.status(200);
        return res.json({msg: "User created successfully", token: token});
    } catch (error) {
        res.status(500);
        return res.json({msg: "Unexpected error"})
    }

});


//google auth
const GoogleSignupSchema = z.object({
    provider: z.string(),
    idToken: z.string()
});
userRouter.post("/google-signup", async (req, res) => {
    const body = req.body;

    const parsedBody = GoogleSignupSchema.safeParse(body);
    if(!parsedBody.success || body.provider.toLowerCase() !== "google"){
        res.status(400);
        return res.json({msg: "Incorrect credentials"})
    };

    try {
        const axiosResponse = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDSQJQFTKzLd554vWTvt2A_SrFVmnjGib8", {
        idToken: body.idToken
        }, {
            headers: {
            'Content-Type': 'application/json'
                }
        })
        const Authdata = axiosResponse.data

        if(Authdata.users[0].emailVerified === 'false'){
            res.status(400);
            return res.json({msg:"Unauthorized"})
        }
    
    
        const userExists = await prisma.user.findUnique({
            where: {
                email: Authdata.users[0].email
            }
        })
        if(userExists){
            const token = jwt.sign({id: userExists.id}, JWT_PASS, {expiresIn: '1h'})
    
            res.status(200);
            return res.json({msg: "Logged in successfully exists", token: token})
        }
    
    
        try {
            const user = await prisma.user.create({
                data: {
                    email: Authdata.users[0].email,
                    username: Authdata.users[0].displayName,
                    provider: body.provider
                }
            });
    
            const token = jwt.sign({id: user.id}, JWT_PASS, {expiresIn: '1h'})
    
            res.status(200);
            return res.json({msg: "User created successfully", token: token});
        } catch (error) {
            console.log(error)
            res.status(500);
            return res.json({msg: "Unexpected error"})
        }

    } catch (error) {
        res.status(403);
        return res.json({msg: "Unexpected error occured"})
    }


});


export default userRouter;
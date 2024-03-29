import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const JWT_PASS = process.env.JWT_PASS;
export interface RequestType extends Request {
    id?: string
}


interface MyJwtPayload extends jwt.JwtPayload{
    id: string
}

export const authMiddleware = async (req:RequestType, res: Response, next: NextFunction) => {
    const authToken = req.headers['authorization'];

    if(!authToken || !authToken.startsWith("Bearer")){
        res.status(403)
        return res.json({msg: "Access denied"})
    };

    const token = authToken.split(" ")[1];

    try {
        const verified = jwt.verify(token, JWT_PASS!) as MyJwtPayload;
        if(!verified){
            res.status(403);
            return res.json({msg: "Unauthorized"})
        }

        req.id = verified.id
        next();
    } catch (error) {
        res.status(403);
        return res.json({msg: "An error occured"})
    }


}
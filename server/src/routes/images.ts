import { Router } from "express";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { RequestType, authMiddleware } from "../authMiddleware";

const imagesRouter = Router();

const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;


const s3client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: accessKeyId!,
        secretAccessKey: secretAccessKey!
    }
})

const getObjectUrl = async (key: string) => {
    const command = new GetObjectCommand({
        Bucket: 'vyala-s3-bucket',
        Key: key
    })

    const url = await getSignedUrl(s3client, command);
    return url;
};


const putObjectUrl = async (type: string) => {
    const date = new Date();
    const command = new PutObjectCommand({
        Bucket: 'vyala-s3-bucket',
        Key: `${date.getTime()}`,
        ContentType :type
    })

    console.log(type);
    const url = await getSignedUrl(s3client, command)
    return url
}



imagesRouter.post("/getpresignedurl", authMiddleware, async (req: RequestType, res) => {
    const body = req.body;
    const key = body.key;

    try {
        const url = await getObjectUrl(key);
        return res.json({url: url});    
    } catch (error) {
        res.status(417);
        return res.json({msg: "Unexpected error"})
    }
    
})


imagesRouter.post("/putpresignedurl", authMiddleware, async (req: RequestType, res) => {
    const body = req.body;
    const {filename, type} = body;

    try {
        const url = await putObjectUrl(type);
        return res.json({msg : url})    
    } catch (error) {
        res.status(417);
        return res.json({msg: "Unexpected error"})
    }

})


export default imagesRouter;
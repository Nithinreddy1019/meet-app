import express from "express";
import cors from "cors"
import userRouter from "./routes/user";
import 'dotenv/config'


const app = express();
app.use(express.json())
app.use(cors())



app.use("/api/v1/user", userRouter)


app.get("/" , async (req, res) => {
    res.json({msg: "Hello there"})
})


app.listen(3000, () => {
    console.log("listening on 3000")
})
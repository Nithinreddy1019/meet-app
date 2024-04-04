import axios from "axios"
import { BACKEND } from "./config"

export const uploadImage = async (img: File) => {
    if(!img){
        return("No image selected")
    };

    const res = await axios.post(`${BACKEND}/api/v1/img/putpresignedurl`, {filename: img.name, type: img.type}, {headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }})
    const  uploadUrl = res.data.msg;

    await axios.put(uploadUrl, img, {headers: {
        "Content-Type": "multipart/form-data"
    }})


    return uploadUrl;

};

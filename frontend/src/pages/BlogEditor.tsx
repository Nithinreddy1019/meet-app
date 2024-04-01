import { Link } from "react-router-dom"
import logo from '../assets/logo.svg'
import Animate from "../components/Animate"
import uploadBanner from "../assets/uploadBanner.png"
import { ChangeEvent, useState } from "react"
import { Toaster, toast } from "sonner"
import { uploadImage } from "../aws"
import { BACKEND } from "../config"
import axios from "axios"
import EditorWysiwig from "../components/EditorWysiwig"

const BlogEditor = () => {

  const [imageSrc, setimageSrc] = useState(uploadBanner);
  const [title, setTitle] = useState('New Blog')

  const handleBannerUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files ===null){
      toast.error("No file chosen")
      return
    }

    const img = e.target.files[0]
    const loadingToast = toast.loading("Uploading...");
    const key = await uploadImage(img);

    const imgNameKey = key.split('?')[0].split("/")
    const finalKey = imgNameKey[imgNameKey.length - 1]
    const res = await axios.post(`${BACKEND}/api/v1/img/getpresignedurl`, {key: finalKey});
    toast.dismiss(loadingToast);

    setimageSrc(res.data.url);   
    toast.success("Uploaded 👍") 
    
  }


  const handleTitleKeydown = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let input = e.target;

    input.style.height = 'auto';
    input.style.height = input.scrollHeight+'px';

    setTitle(input.value);
  }



  return (
    <>

        <nav className="flex items-center bg-white sticky z-10 h-[64px] px-[5vw] border-b gap-12">

            <Link to={'/'}>
                <img src={logo} className='w-14 h-14'/>
            </Link>

            <p className="max-md:hidden line-clamp-1 max-w-36 text-textlightb">
              {title} 
            </p>

            <div className="flex ml-auto gap-4">

              <button className="hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:bg-black bg-textlightb text-lightb px-4 py-1 rounded-full transition-all duration-200">
                Publish
              </button>

              <button className="hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-lighta text-textlightb px-2 py-1 rounded-full transition-all duration-200">
                Save draft
              </button>

            </div>

        </nav>
        
        <Animate>
          <div className="mx-auto max-w-[900px] w-full text-textlightb mt-2 px-2">
            <Toaster position="top-center" duration={1500} visibleToasts={2}/>

            <div className="realtive aspect-video hover:opacity-80 border-4 border-gray-100 transition-all duration-300">
              <label htmlFor="uploadBanner">
                <img 
                  src={imageSrc || uploadBanner}
                  className="w-full h-full z-20 opacity-20"/>
                <input 
                  id="uploadBanner" 
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  hidden
                  onChange={handleBannerUpload}
                  />

              </label>
            </div>

            <textarea 
            placeholder="Blog title"
            className="w-full h-24 mt-4 text-4xl font-medium outline-none resize-none placeholder:opacity-40"
            onKeyDown={handleTitleKeydown}
            onChange={handleTitleChange}>
            </textarea>

            <hr className="w-full my-4 opacity-40"/>

            <div id="textEditor" className="w-full text-xl">
              <EditorWysiwig />
            </div>

          </div>
        </Animate>

    </>
  )
}

export default BlogEditor

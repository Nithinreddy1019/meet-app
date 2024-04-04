import { Toaster, toast } from "sonner"
import Animate from "../components/Animate"
import { useNavigate } from "react-router-dom"
import blogBanner from "../assets/uploadBanner.png"
import Tag from "../components/Tag"
import { ChangeEvent, EventHandler, MouseEventHandler, useState } from "react"
import { useRecoilState } from "recoil"
import { tagsAtom } from "../store/atoms/Tags"

const BlogPublish = () => {
  const navigate = useNavigate();

  const [tags, setTags] = useRecoilState(tagsAtom)

  const handleTitleKeydown = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ","){
      e.preventDefault();

      let tag = (e.target as HTMLInputElement).value

      if(tags.length <= 10){
        if(!tags.includes(tag) && tag.length){
          setTags([...tags, tag])
        }
      } else {
        toast.error("You can max 10 tags")
      }

      (e.target as HTMLInputElement).value = "";

    }
  }


  

  return (
    <Animate>
      <Toaster position="top-center" duration={1500} visibleToasts={2} richColors/>
      <section className="px-2 w-screen min-h-screen grid items-center lg:grid-cols-2 py-8 lg:gap-4 lg:py-16 text-textlightb">

        

        <button className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[8%]" onClick={() => {navigate("/write")}}>
          <i className="fi fi-rs-circle-xmark"></i>
        </button>


        <div className="max-w-[550px] block mx-auto">
          <p className="text-textlightb mb-1 mt-2 mx-2">Preview</p>

          <div className="borber-4 border-gray-400 w-full aspect-video rounded-lg overflow-hidden px-2">
            <img src={blogBanner} className=""/>
          </div>

          <h1 className="text-4xl font-medium line-clamp-2 mt-2 leading-tight">Title</h1>

          <p className="line-clamp-2 text-xl leading-7 mt-4">Description</p>

        </div>


        <div className="border-gray-800">
          <p className="mb-2 mt-9">Title</p>
          <input placeholder="Blog Title" defaultValue={"Title Here from state"} type="text" className="px-4 h-12 focus:outline-purple-300 bg-lighta rounded-lg focus:bg-white w-full"/>


          <p className="mb-2 mt-9">Short Description about your blog</p>
          <textarea maxLength={250} placeholder="Blog Title" defaultValue={"Title Here from state"} className="h-36 resize-none leading-7 focus:outline-purple-300 bg-lighta focus:bg-white rounded-lg w-full px-4 pt-2" onKeyDown={handleTitleKeydown}></textarea>

          <p className="mt-1 text-textlightb text-sm pr-4 text-right">'Character limit - len(Description)' characters left</p>



          <p className="mt-9 mb-2 pr-2">Topics - (Helps in searching your blog)</p>

          <div className="relative h-fit focus:outline-purple-300 bg-lighta rounded-lg focus:bg-white w-full px-2 py-2 pb-4">
            <input type="text" placeholder="Topics" className="sticky bg-white top-0 left-0 h-10 rounded-lg px-4 w-full focus:outline-purple-300 mb-3" onKeyDown={handleTagKeyDown}/>

            {
              tags.map((tag, i) => {
                if(tag !== ''){
                  return <Tag tagValue={tag} tagIndex={i}></Tag>
                }
                
              })
            }

          
          </div>

          <p className="mt-1 mb-2 text-sm text-right">{11 - tags.length} tags left</p>
        </div>

      </section>
    </Animate>
  )
}

export default BlogPublish

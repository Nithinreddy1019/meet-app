import { useState } from "react"
import BlogEditor from "./BlogEditor"
import BlogPublish from "./BlogPublish"

const Write = () => {

  const [inEditor, setInEditor] = useState("editor")

  return (
    inEditor === "editor" ? <BlogEditor /> : <BlogPublish /> 
  )
}

export default Write
   
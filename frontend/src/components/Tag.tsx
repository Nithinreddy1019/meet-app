import { useRecoilState } from "recoil"
import { tagsAtom } from "../store/atoms/Tags"
import { ChangeEvent, ChangeEventHandler, useState } from "react";


interface tagProps {
    tagValue: string,
    tagIndex: number
}


const Tag = ({tagValue, tagIndex}: tagProps) => {

    const [tags, setTags] = useRecoilState(tagsAtom);
    const [tag, setTag] = useState(tagValue)

    const [editable, setEditable] = useState(true)

    const handleTagDelete = () => {
        setTags(tags.filter(t => t !== tagValue))
    }


    const handleTagEdit = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
        if(e.key === 'Enter' || e.key === ','){
            e.preventDefault();

            const newTagValue = e.currentTarget.textContent
            if(newTagValue !== null){
                const updatedTags = [...tags];
                updatedTags[tagIndex] = newTagValue;
                setTags(updatedTags)
                e.currentTarget.setAttribute("contentEditable", "false")
            }
        }
    }


    const handleEditable = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.currentTarget.setAttribute("contentEditable", "true");
        e.currentTarget.focus();
    }
    


  return (
    <div className="relative p-1 mt-2 mr-2 px-4 bg-white rounded-full inline-block pr-8 text-sm text-textlightb font-medium">
        <p className="outline-none" contentEditable='true' onKeyDown={handleTagEdit} onClick={handleEditable}>{tag}</p>

        <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full mt-[2px]" onClick={handleTagDelete}>
            <i className="fi fi-rr-cross-small pointer-events-none text-xl"></i>
        </button>
    </div>
  )
}

export default Tag

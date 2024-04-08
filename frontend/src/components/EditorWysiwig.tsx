import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems, insertOrUpdateBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, SuggestionMenuController, getDefaultReactSlashMenuItems, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css"
import "@mantine/core/styles.css";
import { useEffect, useState } from "react";
import { Alert } from "./EditorAlert";
import { RiAlertFill } from "react-icons/ri";
import { uploadImage } from "../aws";
import axios from "axios";
import { BACKEND } from "../config";



function EditorWysiwig() {

    const [jsonValue, setJsonValue] = useState<string>("");

  // Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
  //Need to upload to aws(todo)
  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);
  

    const key = await uploadImage(file);

    const imgNameKey = key.split('?')[0].split("/")
    const finalKey = imgNameKey[imgNameKey.length - 1]
    const res = await axios.post(`${BACKEND}/api/v1/img/getpresignedurl`, {key: finalKey}, {headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }});

    return(res.data.url)


    const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: body,
    });
    return (await ret.json()).data.url.replace(
      "tmpfiles.org/",
      "tmpfiles.org/dl/"
    );
  };


  const schema = BlockNoteSchema.create({
    blockSpecs: {
      // Adds all default blocks.
      ...defaultBlockSpecs,
      // Adds the Alert block.
      alert: Alert,
    },
    
  });

  const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Alert",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "alert",
      });
    },
    aliases: [
      "alert",
      "notification",
      "emphasize",
      "warning",
      "error",
      "info",
      "success",
    ],
    group: "Other",
    icon: <RiAlertFill />,
  });


  
  const editor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: "paragraph",
        content: "Let's write an awesome blog"
      }
    ],
    uploadFile,
  
  });
 

  useEffect(() => {
    const loadInitialHtml = async () => {
      const initialHtml = localStorage.getItem("docValue")
      const blocks = await JSON.parse(initialHtml!);
      editor.replaceBlocks(editor.document, blocks)
      console.log(editor.replaceBlocks(editor.document, blocks))
    }

    loadInitialHtml()
  }, [])



  const handleChange = async() => {
    const jsonValue = JSON.stringify(editor.document);
    setJsonValue(jsonValue)
    localStorage.setItem("docValue", jsonValue)
  }



  return (
    <div>
      <BlockNoteView editor={editor} theme={'light'} className=" h-96" slashMenu={false} onChange={handleChange} >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            // Gets all default slash menu items and `insertAlert` item.
            filterSuggestionItems(
              [...getDefaultReactSlashMenuItems(editor), insertAlert(editor)],
              query
            )
          }
        />
      </BlockNoteView>

    </div>
  ) 
}


export default EditorWysiwig;
 
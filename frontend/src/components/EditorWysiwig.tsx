import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems, insertOrUpdateBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, SuggestionMenuController, getDefaultReactSlashMenuItems, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css"
import "@mantine/core/styles.css";
import { useEffect, useState } from "react";
import { Alert } from "./EditorAlert";
import { RiAlertFill } from "react-icons/ri";



function EditorWysiwig() {

  // Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
  //Need to upload to aws(todo)
  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);
  
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
    }

    loadInitialHtml()
  }, [])


  const handleSave = async () => {
    const html = await JSON.stringify(editor.document);
    localStorage.setItem("docValue", html);
  }



  return (
    <div>
      <BlockNoteView editor={editor} theme={'light'} className=" h-96" slashMenu={false}>
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


      <button className="bg-black text-white rounded-xl px-3 py-2 mt-8 ml-4" onClick={handleSave}>Save</button>
    </div>
  ) 
}


export default EditorWysiwig;
 
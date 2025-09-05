import { useGitContext} from "../Context/GitContext.tsx";
import Markdown from "react-markdown";
import {useState} from "react";
const ChangelogPreview = () => {
   const { changelog } = useGitContext();
   const [preview, setPreview] = useState<boolean>(false);
   const [buttonText, setButtonText] = useState<string>("Preview");
   return (
       <>
           <div>
               <button onClick={() => {
                    setPreview(!preview);
                    setButtonText(preview ? "Preview" : "Raw");
               }} className={ `${changelog ? 'block' :  'hidden' } bg-background-sec p-2 text-xl rounded-t-xl`}>{buttonText}</button>
           </div>
           <div className={`w-[70vw] max-h-96 flex flex-row bg-background-sec overflow-auto p-4 text-primary prose lg:prose-xl background-sec rounded-md`}>
               <div className={`${!preview ? "block" : "hidden"}`}>
                   {changelog}
               </div>
               <div className={`${preview ? "block" : "hidden"}`}>
                   <Markdown>
                       {changelog}
                   </Markdown>
               </div>
           </div>
       </>

   );
}

export default ChangelogPreview;
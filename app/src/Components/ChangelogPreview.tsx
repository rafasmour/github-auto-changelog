import {useGitContext} from "../Context/GitContext.tsx";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChangelogPreview = () => {
    const {changelog} = useGitContext();
    return (
        <div className={`w-80 md:w-200 md:text-lg max-h-80 scroll p-4 overflow-hidden mx-auto my-6 prose prose-sm border-4 border-accent rounded-sm   ${changelog ? 'opacity-100' : 'opacity-0'} overflow-y-auto`}
        >
            <Markdown skipHtml remarkPlugins={[remarkGfm]}>{changelog}</Markdown>
        </div>
    );
}

export default ChangelogPreview;
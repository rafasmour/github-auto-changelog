import {useGitContext} from "../Context/GitContext.tsx";

const DownloadChangelog = () => {
    const { changelog, setChangelog } = useGitContext();
    const download = () => {
        const element = document.createElement("a");
        element.setAttribute('href', 'data:text/plain:charset=utf-8,' + encodeURIComponent(changelog));
        element.setAttribute('download', 'CHANGELOG.md');
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        // Clear changelog after download
        setChangelog("");

    }
    return changelog && (
        <button onClick={() => download()}
        className={`${changelog ? "block" : "hidden"} p-5 text-2xl font-bold bg-background-sec rounded-lg cursor-pointer focus:outline-none focus:ring-2 ring-accent hover:bg-accent`}
        >Download</button>
    )
}

export default DownloadChangelog;
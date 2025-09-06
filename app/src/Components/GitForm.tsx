import * as React from "react";
import {FormEvent, useState} from "react";
import {useGitContext} from "../Context/GitContext.tsx";
const GitForm: React.FC = () => {
    const { fetchChangelog, isFetching, error } = useGitContext();
    const [gitURL, setGitURL] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const submitForm = async (e: FormEvent<HTMLFormElement>)=>  {
        e.preventDefault();
        setMessage("fetching repository...")
        fetchChangelog(gitURL);
        setGitURL("");
    }

    return (
        <form onSubmit={submitForm} className={`w-[80%] h-fit md:w-200 md:p-10 rounded-md flex flex-col gap-y-4 items-center justify-center h-40  focus-within:ring-3 shadow-accent focus-within:shadow-md ring-accent  focus:ring bg-transparent opacity-90  `}>
            <legend className="sm:text-3xl text-primary mb-10 text-shadow-lg">Git Auto Changelog</legend>
            <div className=" md:w-full grid grid-cols-10  rounded-xl  shadow-secondary shadow-md focus-within:shadow-lg">
                <input disabled={isFetching} type="text" value={gitURL} onChange={(e) => setGitURL(e.target.value)} placeholder="Insert Git URL..."
                       className={` ${isFetching ? "cursor-not-allowed" : ""} col-span-8 w-full text-primary  placeholder-accent p-3 mr-0.5 rounded-l-md  focus:ring-accent focus:ring-2 outline-none border-none`}/>
                <button
                    type="submit"
                    disabled={isFetching}
                    className={` ${isFetching ? "cursor-not-allowed" : ""} col-span-2   p-3 bg-background-sec flex items-center justify-center text-primary rounded-r-md focus:outline-0 ring-accent focus:ring-2 active:text-shadow-md text-shadow-accent cursor-pointer hover:bg-accent focus:ring-l-0`}
                >
                    {isFetching ? (
                        <span className="inline-block w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                        "Fetch"
                    )}
                </button>
            </div>
            {message && isFetching && <p className="text-primary mt-2 text-lg animate-pulse">{message}</p>}
            {error && <p className="text-red-500 animate-pulse text-lg mt-2">{error}</p>}
        </form>
    );
}

export default GitForm;
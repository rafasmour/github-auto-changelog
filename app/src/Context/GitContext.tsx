import {createContext, useContext, useState, ReactNode} from "react";
import axios, {AxiosResponse} from "axios";

type GitContextType = {
    changelog: string;
    setChangelog: (changelog: string) => void;
    fetchChangelog: (gitURL: string) => Promise<void>;
    showEditor: boolean;
    setShowEditor: (show: boolean) => void;
    isFetching: boolean;
    setIsFetching: (fetching: boolean) => void;
    error: string | null;
};

const GitContext = createContext<GitContextType | undefined>(undefined);

type GitContextProviderProps = {
    children: ReactNode;
};

export const GitContextProvider = ({children}: GitContextProviderProps) => {
    const [changelog, setChangelog] = useState<string>("");
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fetchChangelog = async (gitURL: string) => {
        try {
            setError(null);
            setIsFetching(true);
            setShowEditor(false);
            if (gitURL) {
                setChangelog("");
                const response: AxiosResponse = await axios.post(`/api/changelog/fetch`, {
                    gitURL
                })
                const data = await response.data;
                console.log(data)
                setChangelog(data);
                setShowEditor(true);
            }
        } catch (e) {
            console.error(e)
            if (axios.isAxiosError(e)) {
                const response = await e.response;
                const data = await response?.data;
                if (data && data.message) {
                    setError(data.message);
                }
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setIsFetching(false);
        }

    };

    return (
        <GitContext.Provider value={{
            changelog,
            setChangelog,
            fetchChangelog,
            showEditor,
            setShowEditor,
            isFetching,
            setIsFetching,
            error
        }}>
            {children}
        </GitContext.Provider>
    );
};

export const useGitContext = () => {
    const context = useContext(GitContext);
    if (!context) {
        throw new Error("useGitContext must be used within a GitContextProvider");
    }
    return context;
};
import { FC } from 'react';
import GitForm from "./Components/GitForm.tsx";
import {GitContextProvider} from "./Context/GitContext.tsx";
import ChangelogPreview from "./Components/ChangelogPreview.tsx";
import DownloadChangelog from "./Components/DownloadChangelog.tsx";
import {FetchProvider} from "./Context/FetchContext.tsx";

const Layout: FC = () => {
    return (
        <div className="min-h-screen min-w-screen bg-background flex flex-col items-center justify-center">
            <GitContextProvider>
                <FetchProvider>
                    <GitForm />
                    <ChangelogPreview />
                    <DownloadChangelog />
                </FetchProvider>
            </GitContextProvider>
        </div>
    );
};

export default Layout;
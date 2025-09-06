import { FC } from 'react';
import GitForm from "./Components/GitForm.tsx";
import {GitContextProvider} from "./Context/GitContext.tsx";
import ChangelogPreview from "./Components/ChangelogPreview.tsx";
import DownloadChangelog from "./Components/DownloadChangelog.tsx";

const Layout: FC = () => {
    return (
        <div className="h-screen w-screen  overflow-hidden bg-background flex flex-col items-center justify-start py-10">
            <GitContextProvider>
                    <GitForm />
                    <ChangelogPreview />
                    <DownloadChangelog />
            </GitContextProvider>
        </div>
    );
};

export default Layout;
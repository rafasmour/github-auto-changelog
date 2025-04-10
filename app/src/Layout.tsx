import { FC } from 'react';
import GitForm from "./Components/GitForm.tsx";

const Layout: FC = () => {
    return (
        <div className="min-h-screen min-w-screen bg-background">
            <GitForm />
        </div>
    );
};

export default Layout;
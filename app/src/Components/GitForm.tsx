import * as React from "react";

const GitForm: React.FC = () => {
    return (
        <form className="flex flex-col items-center justify-center h-screen hover:shadow-accent hover:shadow-2xl">
            <legend className="text-3xl text-primary mb-10 text-shadow-lg text-shadow-">Git Auto Changelog</legend>
            <div className="lex flex-col items-center justify-center">
                <input type="text" className=" w-100 px-2 py-2 bg-secondary  radius focus:ring-accent focus:ring-2 focus:outline-none focus:ring-l-0"/>
                <input type="submit"  />
            </div>

        </form>
    );
}

export default GitForm;
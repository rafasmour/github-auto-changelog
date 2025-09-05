import React, {createContext} from "react";

type FetchContextType = {
    isFetching: boolean;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const FetchContext = createContext<FetchContextType | null>(null);

export const FetchProvider = ({children}: {children: React.ReactNode}) => {
    const [isFetching, setIsFetching] = React.useState<boolean>(false);

    return (
        <FetchContext.Provider value={{isFetching, setIsFetching}}>
            {children}
        </FetchContext.Provider>
    );
}

export const useFetch = () => {
    const context = React.useContext(FetchContext);
    if (!context) {
        throw new Error("useFetch must be used within a FetchProvider");
    }
    return context as FetchContextType;
}
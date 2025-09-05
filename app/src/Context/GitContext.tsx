import { createContext, useContext, useState, ReactNode } from "react";

type GitContextType = {
  changelog: string;
  fetchChangelog: (gitURL: string) => Promise<void>;
};

const GitContext = createContext<GitContextType | undefined>(undefined);

type GitContextProviderProps = {
  children: ReactNode;
};

export const GitContextProvider = ({ children }: GitContextProviderProps) => {
  const [changelog, setChangelog] = useState<string>("");

  const fetchChangelog = async (gitURL: string) => {
      try {
          const response = await fetch("/api/changelog/fetch", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ gitURL }),
          });
          const data = await response.json();
          setChangelog(data);
      } catch (e) {
          console.error(e)
      }

  };

  return (
      <GitContext.Provider value={{ changelog, fetchChangelog }}>
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
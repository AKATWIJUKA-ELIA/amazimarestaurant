"use client"
import React, { createContext, useContext, useState } from "react";

interface user {
  
}
interface User{
        User:user|null;
}
 

const DataContext = createContext<{
  data: { User: User | null };
  setData: React.Dispatch<React.SetStateAction<{ User: User | null }>>;
}>({
  data: { User: null },
  setData: () => {},
});

export const DataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  
  const [data, setData] = useState<{ User: User | null }>({ User: null });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  return useContext(DataContext);
}
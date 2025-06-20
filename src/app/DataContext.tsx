"use client";
import React, { createContext, useContext, useState, useEffect, } from "react";
import { AppwriteUser } from "@/lib/types";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { usePathname } from 'next/navigation';


const DataContext = createContext<{
  data: { User: AppwriteUser | null };
  setData: React.Dispatch<React.SetStateAction<{ User: AppwriteUser | null }>>;
}>({
  data: { User: null },
  setData: () => {},
});

export const DataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<{ User: AppwriteUser | null }>({ User: null });
        const { CurrentUser } = useGetCurrentUser();
        const pathname = usePathname()


  useEffect(() => {
    // Fetch current user from Appwrite on mount
    CurrentUser().then((user) => {
      setData({ User: user.user || null });
    });
  }, [pathname]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  return useContext(DataContext);
}
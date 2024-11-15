import React, { createContext, useState, ReactNode } from 'react';

interface DateContextType {
  startFinal: string;
  setStartFinal: React.Dispatch<React.SetStateAction<string>>;
  endFinal: string;
  setEndFinal: React.Dispatch<React.SetStateAction<string>>;
}

export const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [startFinal, setStartFinal] = useState("");
  const [endFinal, setEndFinal] = useState("");

  return (
    <DateContext.Provider value={{ startFinal, setStartFinal, endFinal, setEndFinal }}>
      {children}
    </DateContext.Provider>
  );
};
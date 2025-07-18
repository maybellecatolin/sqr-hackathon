import React, { useEffect } from "react";
import { connectSocket, disconnectSocket } from "./libs/socket";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    connectSocket('ws://localhost:3000');
    return () => {
      disconnectSocket();
    };
  }, []);

  return <>{children}</>;
};

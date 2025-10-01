import React, { useEffect } from "react";
// 🚨 Import cả message (bên cạnh notification và App)
import { message, App } from "antd";

interface AppConfigProviderProps {
  children: React.ReactNode;
}

const AppConfigProvider: React.FC<AppConfigProviderProps> = ({ children }) => {
  useEffect(() => {
    message.config({
      duration: 2,
      maxCount: 1,
      top: 160, 
    });
  }, []);

  return <App>{children}</App>;
};

export default AppConfigProvider;

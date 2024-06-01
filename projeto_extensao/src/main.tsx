import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

const config = {
  token: {
    colorPrimary: "#04652F",
    colorSecondary: "#E5EDEA",
    colorSuccess: "#6EC936",
    colorInfo: "#45bfd6",
    colorWarning: "#f3ab15",
    colorHelp: "#001529",
    colorDanger: "#DC2626",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    fontSizeIcon: 18,
    fontFamilyCode: "monospace",
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={ptBR} theme={config}>
    <App />
  </ConfigProvider>
);

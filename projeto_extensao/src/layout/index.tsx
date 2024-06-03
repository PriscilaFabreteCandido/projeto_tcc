import { Outlet } from "react-router-dom";

import "./styles.css";
import Breadcrumbs from "../components/Breadcrumbs";
import MenuLeft from "../components/MenuLeft";
import ifes from "../assets/images/LogoLeter_LetraPreta-removebg-preview.png";
import logo from "../assets/images/logo.png";

import {  useState } from "react";
import Layout, { Content, Header } from "antd/es/layout/layout";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { colors } from "../global/theme/theme";

function RootLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }} >
      <Sider className="seu-elemento" trigger={null} collapsible collapsed={collapsed} width={300} style={{background: "white"}} >
        {/* <div className="demo-logo-vertical" /> */}
        <div
          style={{
            width: "100%",
            height: 100,
            padding: !collapsed ? "24px 16px" : "0px",
            display: "flex", // Adiciona display: flex para alinhar verticalmente
            alignItems: "center", // Alinha o conteúdo verticalmente ao centro
          }}
          className="logo"
        >
          <img
            src={!collapsed ? ifes : logo}
            alt="Descrição da imagem"
            style={{
              width: "100%",
              height: "auto", // Alterado para "auto" para manter a proporção da imagem
              objectFit: "cover",
              
            }}
          />
        </div>

        <MenuLeft />
      </Sider>

      <Layout >
        <Header
          style={{ padding: 0, background: colors.primary }}
          className="shadow"
        >
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{color: 'white'}} />
              ) : (
                <MenuFoldOutlined style={{color: 'white'}} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Breadcrumbs />
        <Content
          className="shadow"
          style={{
            margin: "0px 2rem 10px 2rem",
            padding: 24,
            minHeight: "80vh",
            overflow: "auto",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default RootLayout;

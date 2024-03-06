import React, { useEffect, useState } from "react";
import {
  BarChartOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  FundProjectionScreenOutlined,
  HeatMapOutlined,
  HomeOutlined,
  IdcardOutlined,
  MedicineBoxOutlined,
  PaperClipOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  SettingOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import "./styles.css";
import { Menu } from "antd";
import transferir from "../../assets/images/ifes.png";
import logo from "../../assets/images/logo2_menor.png";
import { useNavigate, useLocation } from "react-router-dom";

interface MenuItem {
  key: React.Key;
  uri?: string | "";
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: "group";
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  uri?: string | "",
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    uri: uri || "",
  };
}

const items: MenuProps["items"] = [
  getItem("Início", "inicio", <HomeOutlined />, "/Inicio"),

  getItem("Cadastros", "consultas", <FileTextOutlined />, "/Consultas", [
    getItem(
      "Equipe de Execução",
      "equipeexecucao",
      <CheckCircleOutlined />,
      "/Equipe de Execução"
    ),
    getItem("Turma", "turma", <CalendarOutlined />, "/Turmas"),
    getItem(
      "Coordenador",
      "coordenador",
      <PaperClipOutlined />,
      "/Coordenador"
    ),
  ]),

  getItem("Documentos", "consultas", <FileTextOutlined />, "/Consultas", [
    getItem(
      "Relatórios",
      "voluntario",
      <BarChartOutlined />,
      "/Cadastros/Usuários"
    ),
    getItem("Ano", "ano", <CalendarOutlined />, "/Cadastros/Exames"),
    getItem(
      "Anexar Documentos",
      "servidores",
      <PaperClipOutlined />,
      "/Cadastros/Exames"
    ),
  ]),
  getItem("Ações", "acoes", <PlayCircleOutlined />, "/Ações"),
];

function MenuLeft({ isIconClicked }: any) {
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;

    const selectedItem = items?.find((item: any) =>
      currentPath.startsWith(item.uri || "")
    );

    if (selectedItem) {
      setDefaultSelectedKeys([selectedItem?.key?.toString()]);
    } else {
      setDefaultSelectedKeys([""]);
    }
  }, [location.pathname, navigate]);

  function encontrarItemDoMenu(items: any[], targetKey: React.Key): void {
    var selectedItem: any = null;
    if (!items || items.length <= 0) return;

    for (const item of items) {
      if (item.key === targetKey) {
        selectedItem = item;
        return selectedItem;
      }

      if (item.children && item.children.length > 0) {
        selectedItem = encontrarItemDoMenu(item.children, targetKey);
        if (selectedItem) return selectedItem;
      }
    }
  }

  const onClick: MenuProps["onClick"] = (e) => {
    var selectedItem: any = encontrarItemDoMenu(items ? items : [], e.key);
    if (selectedItem && selectedItem.uri) {
      navigate(selectedItem.uri);
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          padding: isIconClicked ? "0rem 1rem" : "1rem 0rem 0rem 0rem",
          height: isIconClicked ? "4rem" : "3rem",
          borderInlineEnd: "1px solid rgba(5, 5, 5, 0.06)",
        }}
        className="logo"
      >
        <img
          src={isIconClicked ? transferir : logo}
          alt="Descrição da imagem"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {defaultSelectedKeys && defaultSelectedKeys.length > 0 && (
        <div
          style={{
            height: "calc(100% - 6rem)",
            overflow: "auto",
            width: "100%",
          }}
        >
          <Menu
            onClick={onClick}
            style={{ height: "90%" }}
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            inlineCollapsed={!isIconClicked}
            items={items}
          ></Menu>

        </div>
      )}
    </>
  );
}

export default MenuLeft;
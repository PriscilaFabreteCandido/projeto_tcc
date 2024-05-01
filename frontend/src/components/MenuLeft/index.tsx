import React, { useEffect, useState } from "react";
import {
  BankOutlined,
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
  ProfileOutlined,
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

  getItem("Cadastros", "cadastros", <FileTextOutlined />, "/Consultas", [
    getItem("Instituição", "instituicao", <BankOutlined />, "Cadastros/Instituições"),
    getItem("Turma", "turma", <SolutionOutlined  />, "Cadastros/Turmas"),
    getItem("Semestre Letivos", "semestre", <CalendarOutlined  />, "Cadastros/Semestres Letivos"),
    getItem("Tipo Ação", "tipoAcao", <FileTextOutlined />, "Cadastros/Tipo Ações"),
    getItem("Pessoas", "pessoas", <TeamOutlined  />, "Cadastros/Pessoas"),
    getItem("Função", "funcao", <IdcardOutlined />, "Cadastros/Funções"),
  ]),
  getItem("Ações", "acoes", <PlayCircleOutlined />, "/Ações"),
  getItem("Dúvidas Frequentes", "duvidas", <PlayCircleOutlined />, "/Ações"),
  getItem("Gerenciar Nívies de Acesso", "niveisAcesso", <PlayCircleOutlined />, "/Ações"),
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

import React, { useEffect, useState } from "react";
import {
  BankOutlined,
  CalendarOutlined,
  DesktopOutlined,
  FileTextOutlined,
  HomeOutlined,
  IdcardOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  SafetyOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import "./styles.css";
import { Menu } from "antd";

import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css"

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
  getItem("Início", "inicio", <HomeOutlined style={{color: "white"}}/>, "/Inicio"),

  getItem("Cadastros", "cadastros", <FileTextOutlined style={{color: "white"}}/>, "/Consultas", [
    getItem("Curso", "cursos", <DesktopOutlined style={{color: "white"}}/>, "Cadastros/Cursos"),
    getItem("Função", "funcao", <IdcardOutlined style={{color: "white"}}/>, "Cadastros/Funções"),
    getItem("Instituição","instituicao",<BankOutlined style={{color: "white"}}/>,"Cadastros/Instituições"),
    getItem("Pessoas", "pessoas", <TeamOutlined style={{color: "white"}}/>, "Cadastros/Pessoas"),
    getItem("Semestre Letivos","semestre",<CalendarOutlined style={{color: "white"}}/>,"Cadastros/Semestres Letivos" ),
    getItem("Tipo Ação","tipoAcao",<FileTextOutlined style={{color: "white"}}/>,"Cadastros/Tipo Ações"),
    getItem("Turma", "turma", <SolutionOutlined style={{color: "white"}}/>, "Cadastros/Turmas"),
  ]),
  getItem("Ações", "acoes", <PlayCircleOutlined style={{color: "white"}}/>, "/Ações"),
  getItem("Dúvidas Frequentes", "duvidas",<QuestionCircleOutlined style={{color: "white"}}/>, "/Dúvidas Frequentes"),
  getItem("Gerenciar Nívies de Acesso", "niveisAcesso", <SafetyOutlined style={{color: "white"}}/>,"/Ações"),
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
    let selectedItem: any = null;
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
    <div style={{ overflow: "auto",}}>
      {defaultSelectedKeys && defaultSelectedKeys.length > 0 && (
        <div
          style={{
            height: "calc(100% - 6rem)",
            overflow: "auto",
            width: "100%",
          }}
        >
          <Menu
            theme="dark"
            
            onClick={onClick}
            style={{ height: "90%" }}
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            inlineCollapsed={!isIconClicked}
            items={items}
            
          />
        </div>
      )}
    </div>
  );
}

export default MenuLeft;

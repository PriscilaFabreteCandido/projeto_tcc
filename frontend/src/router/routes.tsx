import { Navigate } from "react-router";
import Home from "../views/app/home";
import RootLayout from "../layout";
import Login from "../views/app/Login";
import Logout from "../views/app/Logout";
import CadastroUsuario from "../views/Cadastros/Usuario/CadastroUsuario";
import Usuarios from "../views/Cadastros/Usuario";
import Relatorios from "../views/Relatorios";
import Error404 from "../components/404";
import EquipesExecucao from "../views/Cadastros/EquipeExecucao";
import Acoes from "../views/Acoes";
import CadastrarAcoes from "../views/Acoes/CadastrarAcoes";
import CadastrarEquipesExecucao from "../views/Cadastros/EquipeExecucao/CadastrarEquipe";
import Instituicoes from "../views/Cadastros/Instituicao";
import Pessoas from "../views/Cadastros/Pessoas";
import Funcao from "../views/Cadastros/Funcao";
import Projetos from "../views/Cadastros/Projeto";
import TiposAcoes from "../views/Cadastros/TipoAcoes";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  permissions: string;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  // { path: "/login", element: <Login />, permissions: "" },
  { path: "/logout", element: <Logout />, permissions: "" },
  {
    path: "",
    element: <RootLayout />,
    permissions: "",
    children: [
      // Inicio
      { path: "Inicio", element: <Home />, permissions: "" },

      //Cadastros
      { path: "Cadastros/Usuários", element: <Usuarios />, permissions: "" },
      { path: "Cadastros/Instituições", element: <Instituicoes />, permissions: "" },
      { path: "Cadastros/Pessoas", element: <Pessoas />, permissions: "" },
      { path: "Cadastros/Funções", element: <Funcao />, permissions: "" },
      { path: "Cadastros/Projetos", element: <Projetos />, permissions: "" },
      { path: "Cadastros/Tipo Ações", element: <TiposAcoes />, permissions: "" },
     
      //Ações
      { path: "Ações", element: <Acoes />, permissions: "" },
      { path: "Ações/Cadastrar Ações", element: <CadastrarAcoes />, permissions: "" },
      

      //Relatórios
      { path: "Relatórios", element: <Relatorios />, permissions: "" },
     
      {
        path: "*",
        permissions: "",
        element: (
          <>
            {" "}
            <Navigate to="/404" replace />
            <Error404 />
          </>
        ),
      },
    ],
  },
];

export default routes;

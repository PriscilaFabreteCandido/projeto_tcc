import { Navigate } from "react-router";
import Home from "../views/app/home";
import RootLayout from "../layout";
import Login from "../views/app/Login";
import Logout from "../views/app/Logout";
import PCMSO from "../views/PCMSO";
import CadastroPCMSO from "../views/PCMSO/CadastroPCMSO";
import CadastroUsuario from "../views/Cadastros/Usuario/CadastroUsuario";
import PerguntasFrequentes from "../views/PerguntasFrequentes";
import CadastroItemPCMSO from "../views/PCMSO/ItemPCMSO/CadastroItemPCMSO";
import ItemPCMSO from "../views/PCMSO/ItemPCMSO";
import CategoriaPerguntasFrequentes from "../views/PerguntasFrequentes/categoria";
import Usuarios from "../views/Cadastros/Usuario";
import Exames from "../views/Cadastros/Exames";
import CadastroExame from "../views/Cadastros/Exames/CadastroExame";
import PGR from "../views/PGR";
import Consultas from "../views/Consultas";
import Relatorios from "../views/Relatorios";
import Error404 from "../components/404";
import EquipesExecucao from "../views/EquipeExecucao";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  permissions: string;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  { path: "/login", element: <Login />, permissions: "" },
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
      {
        path: "Cadastros/Usuários/Cadastrar",
        element: <CadastroUsuario />,
        permissions: "",
      },
      {
        path: "Cadastros/Usuários/Cadastrar/:id",
        element: <CadastroUsuario />,
        permissions: "",
      },

      { path: "Cadastros/Exames", element: <Exames />, permissions: "" },
      {
        path: "Cadastros/Exames/Cadastrar",
        element: <CadastroExame />,
        permissions: "",
      },

      //Consultas
      { path: "Consultas", element: <Consultas />, permissions: "" },

      //Equipe de Execução
      { path: "Equipe de Execução", element: <EquipesExecucao />, permissions: "" },

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

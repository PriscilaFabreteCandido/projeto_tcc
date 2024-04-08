import React from "react";
import { Button, Input, Select, Space, Table } from "antd";
import { InfoOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  nome: string;
  matricula: string;
  projeto: string;
  tipoAcao: string;
  anoNivel: string;
  evento: string;
  tipoparticipante: string;
}

const { Option } = Select;

const ConsultasPessoas: React.FC = () => {
  const navigate = useNavigate();

  const projetos = ["Titãs da Robótica", "Letter"];

  const columns: ColumnsType<DataType> = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Matrícula",
      dataIndex: "matricula",
      key: "matricula",
    },
    {
      title: "Projeto",
      dataIndex: "projeto",
      key: "projeto",
    },
    {
      title: "Evento",
      dataIndex: "evento",
      key: "evento",
    },
    {
      title: "Tipo de Ação",
      dataIndex: "tipoAcao",
      key: "tipoAcao",
    },
    {
      title: "Ano Nível",
      dataIndex: "anoNivel",
      key: "anoNivel",
    },
    {
      title: "Tipo Participante",
      dataIndex: "tipoparticipante",
      key: "tipoparticipante",
    },
    
  ];

  const data: any[] = [
    {nome: "João", matricula: '45', anoNivel: "Superior", evento: "Curso de Informatica", projeto: "Titas da Rbotica", tipoAcao: "Curso", tipoparticipante: "Bolsita"},
    {nome: "Maria",  matricula: '45', anoNivel: "Superior", evento: "Curso de Informatica", projeto: "Titas da Rbotica", tipoAcao: "Curso", tipoparticipante: "Partipante"}
  ];

  return (
    <>
      <div className="flex justify-content-between pb-1" style={{ flex: 1 }}>
        {/* Filtros */}
        <div className="flex filtros-card" style={{ width: "90%" }}>
          <Select
            defaultValue="Titãs da Robótica"
            style={{ width: "150px", marginLeft: "10px" }}
          >
            {projetos.map((projeto) => (
              <Option key={projeto} value={projeto}>
                {projeto}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Tipo Ação"
            style={{ width: "150px", marginLeft: "10px" }}
          >
             {["Palestra", "Curso"].map((projeto) => (
              <Option key={projeto} value={projeto}>
                {projeto}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Evento"
            style={{ width: "250px", marginLeft: "10px" }}
          >
            {["Palestra de Informática"].map((projeto) => (
              <Option key={projeto} value={projeto}>
                {projeto}
              </Option>
            ))}
          </Select>

          
          <Select
            placeholder="Ano"
            style={{ width: "100px", marginLeft: "10px" }}
          >
             {["2023"].map((projeto) => (
              <Option key={projeto} value={projeto}>
                {projeto}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Instituição Atendida"
            style={{ width: "200px", marginLeft: "10px" }}
          >
             {["IFES", "Conde de Linhares"].map((projeto) => (
              <Option key={projeto} value={projeto}>
                {projeto}
              </Option>
            ))}
          </Select>
          
        </div>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ConsultasPessoas;

import React from "react";
import {
  Button,
  Input,
  Select,
  Space,
  Table,
} from "antd";
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
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<InfoOutlined />}
            onClick={() => {
              // Implementar a lógica para visualizar participantes
            }}
          >
            Visualizar
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              navigate("/Ações/Editar Ações");
            }}
          >
            Editar
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    // Seus dados aqui...
  ];

  return (
    <>
      <div className="flex justify-content-between pb-1" style={{ flex: 1 }}>
        {/* Filtros */}
        <div className="flex filtros-card" style={{ width: "90%" }}>
          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              // Implementar a lógica para procurar pessoas
            }}
          >
            Procurar Pessoa
          </Button>
          <Select defaultValue="Titãs da Robótica" style={{ width: "150px", marginLeft: "10px" }}>
            {projetos.map((projeto) => (
              <Option key={projeto} value={projeto}>
                {projeto}
              </Option>
            ))}
          </Select>
          <Select placeholder="Tipo Ação" style={{ width: "150px", marginLeft: "10px" }}>
            {/* Opções do select */}
          </Select>
          <Select placeholder="Ano" style={{ width: "100px", marginLeft: "10px" }}>
            {/* Opções do select */}
          </Select>
          <Select placeholder="Nível" style={{ width: "100px", marginLeft: "10px" }}>
            {/* Opções do select */}
          </Select>
        </div>
        <div>
          <Button
            type="primary"
            onClick={() => {
              navigate("/Pessoas");
            }}
          >
            Selecionar Participantes
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ConsultasPessoas;

import React from "react";
import {
  Button,
  Input,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import {
  InfoOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { ColumnsType } from "antd/es/table";
// import { exportToExcel, exportToPDF } from "./exportUtils"; // Suponha que exista um arquivo exportUtils.js com funções de exportação

interface DataType {
  key: React.Key;
  nome: string;
  projeto: string;
  tipoAcao: string;
  publicoAlvo: string;
  instituicaoAtendida: string;
  numeroVagas: number;
  duracao: string;
  horarioInicio: string;
  horarioTermino: string;
}

const { Option } = Select;

const ConsultarAcoes: React.FC = () => {
  const navigate = useNavigate();

  const projetos = ["Programa-se", "Titãs da Robótica", "Letter"];

  const columns: ColumnsType<DataType> = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
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
      title: "Público Alvo",
      dataIndex: "publicoAlvo",
      key: "publicoAlvo",
    },
    {
      title: "Instituição Atendida",
      dataIndex: "instituicaoAtendida",
      key: "instituicaoAtendida",
    },
    {
      title: "Número de Vagas",
      dataIndex: "numeroVagas",
      key: "numeroVagas",
    },
    {
      title: "Duração",
      dataIndex: "duracao",
      key: "duracao",
    },
    {
      title: "Horário de Início",
      dataIndex: "horarioInicio",
      key: "horarioInicio",
    },
    {
      title: "Horário de Término",
      dataIndex: "horarioTermino",
      key: "horarioTermino",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Visualizar Participantes">
            <Button
              type="primary"
              icon={<InfoOutlined />}
              onClick={() => {
                // Implementar a lógica para visualizar participantes
              }}
            >
              Vincular Equipe
            </Button>
          </Tooltip>
          
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

  // Função para exportar para PDF
  const handleExportPDF = () => {
    //exportToPDF(data, columns, "Relatorio.pdf");
  };

  // Função para exportar para Excel
  const handleExportExcel = () => {
    //exportToExcel(data, "Relatorio");
  };

  // Valores fake para as ações
  const data: DataType[] = [
    // Seus dados aqui...
  ];

  return (
    <>
      <div className="flex justify-content-between pb-1" style={{ flex: 1 }}>
        {/* Filtros */}
        <div className="flex filtros-card" style={{ width: "90%" }}>
          <Select placeholder="Ano" style={{ width: "100px" }}>
            {/* Opções do select */}
          </Select>

          <Input
            placeholder="Nome da Ação"
            style={{ width: "150px", marginLeft: "10px" }}
          />

          <Select placeholder="Projeto" style={{ width: "150px", marginLeft: "10px" }}>
            {/* Opções do select */}
          </Select>

          <Select placeholder="Tipo Ação" style={{ width: "150px", marginLeft: "10px" }}>
            {/* Opções do select */}
          </Select>
        </div>

        <div>
          <Button type="primary" onClick={handleExportPDF}>
            Exportar PDF
          </Button>
          <Button type="primary" onClick={handleExportExcel}>
            Exportar Excel
          </Button>
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

export default ConsultarAcoes;

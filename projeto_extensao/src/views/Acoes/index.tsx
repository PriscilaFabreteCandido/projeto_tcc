import React, { useEffect } from "react";
import {
  Button,
  Input,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { ColumnsType } from "antd/es/table";
import { get } from "../../api/axios";

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

const Acoes: React.FC = () => {
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
          <Tooltip title="Visualizar informações">
            <Button
              type="primary"
              icon={<InfoCircleOutlined />}
              onClick={() => {
                navigate("/Ações/Vincular Equipe de Execução");
              }}
              className="ifes-btn-info"
            >
              
            </Button>
          </Tooltip>
          <Tooltip title="Vincular Equipe de Execução">
            <Button
              type="primary"
              icon={<UsergroupAddOutlined />}
              onClick={() => {
                navigate("/Ações/Vincular Equipe de Execução");
              }}
              className="ifes-btn-help"
            >
              
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              className="ifes-btn-warning"
              icon={<EditOutlined />}
              onClick={() => {
              
              }}
            >
              
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Valores fake para as ações
  const data: DataType[] = [
    {
      key: "1",
      nome: "Curso de Informática Básica",
      projeto: projetos[0],
      tipoAcao: "Curso",
      publicoAlvo: "Público Alvo 1",
      instituicaoAtendida: "Instituição 1",
      numeroVagas: 10,
      duracao: "2 horas",
      horarioInicio: "08:00",
      horarioTermino: "10:00",
    },
    {
      key: "2",
      nome: "Palestra",
      projeto: projetos[1],
      tipoAcao: "Palestra",
      publicoAlvo: "Público Alvo 2",
      instituicaoAtendida: "Instituição 2",
      numeroVagas: 20,
      duracao: "3 horas",
      horarioInicio: "14:00",
      horarioTermino: "17:00",
    },
    {
      key: "3",
      nome: "Visita Guiada",
      projeto: projetos[2],
      tipoAcao: "Visita Guiada",
      publicoAlvo: "Público Alvo 3",
      instituicaoAtendida: "Instituição 3",
      numeroVagas: 30,
      duracao: "4 horas",
      horarioInicio: "09:00",
      horarioTermino: "13:00",
    },
  ];

  const getContextData = async () => {
    setLoading(true);
    try {
      const response: AcaoContextDataType = await get("acoes/contextData");
      setAcaoContexData(response)
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContextData();
  }, []);
  
  return (
    <>
      <div className="flex justify-content-between pb-1" style={{ flex: 1 }}>
        {/* Filtros */}
        <div className="flex filtros-card" style={{ width: "90%" }}>
          <Select placeholder="Ano">
            {[
              { id: 1, nome: "2022" },
              { id: 2, nome: "2023" },
              { id: 3, nome: "2024" },
            ].map((option) => (
              <Select.Option key={option.id} value={option.nome}>
                {option.nome}
              </Select.Option>
            ))}
          </Select>
          <Input placeholder="Nome da Ação" style={{ width: "100px" }} />

          <Select placeholder="Projeto" style={{ width: "150px" }}>
            {[
              { id: 1, nome: "Letter" },
              { id: 2, nome: "Titãs da Robótica" },
              { id: 3, nome: "Programa-se" },
            ].map((option) => (
              <Select.Option key={option.id} value={option.nome}>
                {option.nome}
              </Select.Option>
            ))}
          </Select>

          <Select placeholder="Tipo Ação" style={{ width: "200px" }}>
            {[
              { id: 1, nome: "Curso" },
              { id: 2, nome: "Visita Guiada" },
              { id: 3, nome: "Palestra" },
            ].map((option) => (
              <Select.Option key={option.id} value={option.nome}>
                {option.nome}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div>
          <Button
            className="ifes-btn-success"
            onClick={() => {
              navigate("/Ações/Cadastrar Ações");
            }}
            value="large"
          >
            <PlusOutlined className="ifes-icon" />
            Adicionar
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Acoes;

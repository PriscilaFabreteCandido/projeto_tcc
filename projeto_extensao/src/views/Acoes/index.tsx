import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  CollapseProps,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  FilterOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  SolutionOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { ColumnsType } from "antd/es/table";

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
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [formFilter] = Form.useForm();

  const onFilter = () => {

  }
  
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className="title-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="flex gap-1" style={{ alignItems: "center" }}>
            <SolutionOutlined
              style={{ fontSize: "18px", marginRight: "8px" }}
            />
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>Ações</span>
          </div>

          <div
            className="flex gap-1"
            style={{ alignItems: "center", gap: "1rem" }}
          >
            {expanded && (
              <Button
                type="primary"
                onClick={() => {
                  onFilter();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FilterOutlined className="ifes-icon" />
                <span style={{ marginLeft: "5px" }}>Filtrar</span>
              </Button>
            )}

            <Button
              className="ifes-btn-success"
              onClick={() => {
                navigate("/Cadastros/Acoes/Cadastrar Nova Ação");
              }}
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <PlusOutlined className="ifes-icon" />
              <span style={{ marginLeft: "5px" }}>Adicionar</span>
            </Button>
          </div>
        </div>
      ),
      children: (
        <div
          className="flex filtros-card"
          style={{ padding: "10px 0", display: "flex", gap: "20px" }}
        >
          <Form
            form={formFilter}
            layout="vertical"
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <Form.Item name="nomeAcao" label="Nome Ação">
              <Input placeholder="Nome Ação" style={{ width: "200px" }} />
            </Form.Item>

            <Form.Item name="projeto" label="Projeto">
              <Select
                placeholder="Selecione um projeto"
                style={{ width: "200px" }}
              >
                <Option value="projeto1">Projeto 1</Option>
                <Option value="projeto2">Projeto 2</Option>
                <Option value="projeto3">Projeto 3</Option>
              </Select>
            </Form.Item>

            <Form.Item name="dataCriacao" label="Data de Criação">
              <DatePicker
                placeholder="Data de Criação"
                style={{ width: "200px" }}
              />
            </Form.Item>

            <Form.Item name="tipoAcao" label="Tipo Ação">
              <Select placeholder="Selecione o tipo" style={{ width: "200px" }}>
                <Option value="tipo1">Tipo 1</Option>
                <Option value="tipo2">Tipo 2</Option>
                <Option value="tipo3">Tipo 3</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

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
            ></Button>
          </Tooltip>
          <Tooltip title="Vincular Equipe de Execução">
            <Button
              type="primary"
              icon={<UsergroupAddOutlined />}
              onClick={() => {
                navigate("/Ações/Vincular Equipe de Execução");
              }}
              className="ifes-btn-help"
            ></Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              className="ifes-btn-warning"
              icon={<EditOutlined />}
              onClick={() => {}}
            ></Button>
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
      projeto: "",
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
      projeto: "",
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
      projeto: "",
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
      //const response: AcaoContextDataType = await get("acoes/contextData");
      //setAcaoContexData(response);
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
      <div className="" style={{ flex: 1 }}>
        <Collapse
          accordion
          items={items}
          onChange={(key) => setExpanded(key.includes("1"))}
        />
      </div>

      <Table columns={columns} dataSource={data} loading={loading} />
    </>
  );
};

export default Acoes;

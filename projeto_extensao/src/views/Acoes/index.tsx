import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  DatePicker,
  Form,
  Input,
  Row,
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
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [formFilter] = Form.useForm();
  const [data, setData] = useState<any[]>();

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
          style={{ padding: "10px 0",}}
        >
          <Form
            form={formFilter}
            layout="vertical"
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="nomeAcao" label="Nome Ação">
                  <Input placeholder="Nome Ação" style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="projeto" label="Projeto">
                  <Select placeholder="Selecione um projeto" style={{ width: "100%" }}>
                    <Option value="projeto1">Projeto 1</Option>
                    <Option value="projeto2">Projeto 2</Option>
                    <Option value="projeto3">Projeto 3</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="dataCriacao" label="Data de Emissão">
                  <DatePicker placeholder="Data de Criação" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="tipoAcao" label="Tipo Ação">
                  <Select placeholder="Selecione o tipo" style={{ width: "100%" }}>
                    <Option value="tipo1">Tipo 1</Option>
                    <Option value="tipo2">Tipo 2</Option>
                    <Option value="tipo3">Tipo 3</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="periodoVigencia" label="Período de Vigência">
                  <DatePicker.RangePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="dataTermino" label="Data de Término">
                  <DatePicker placeholder="Data de Término" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="ano" label="Ano">
                  <Input placeholder="Ano" type="number" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
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
              onClick={() => { }}
            ></Button>
          </Tooltip>
        </Space>
      ),
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

  const getAcoes = async () => {
    setLoading(true);
    try {
      const response: any[] = await get("acoes");
      setData(response);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContextData();
    getAcoes()
  }, []);

  return (
    <>
      <div className="" style={{ flex: 1, marginBottom: "1rem" }}>
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

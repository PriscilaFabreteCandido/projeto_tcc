import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Select,
  CollapseProps,
  DatePicker,
  Form,
  Collapse,
  Row,
  Col,
} from "antd";
import {
  FileExcelOutlined,
  FileOutlined,
  FilePdfOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { get } from "../../../api/axios";
import { ActionType } from "../../Cadastros/TipoAcoes";

const { Option } = Select;

const EmitirRelatorio = () => {
  const [expanded, setExpanded] = useState(true);
  const [formFilter] = Form.useForm();
  const [tiposAcoes, setTiposAcoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const data = [
    {
      key: "1",
      year: "2021",
      type: "Ação 1",
      description: "Descrição da Ação 1",
    },
    {
      key: "2",
      year: "2022",
      type: "Ação 2",
      description: "Descrição da Ação 2",
    },
    // Adicione mais dados conforme necessário
  ];

  const onFilter = () => { };

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
          <div className="flex gap-1" style={{}}>
            <FileOutlined
              style={{
                fontSize: "18px",
                marginRight: "8px",
                alignItems: "center",
              }}
            />
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              Emitir Relatório
            </span>
          </div>

          <div className="flex gap-1" style={{ gap: "1rem" }}>

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


            <Button
              className="ifes-btn-danger"
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FilePdfOutlined className="ifes-icon" />
              <span style={{ marginLeft: "5px" }}>Emitir PDF</span>
            </Button>

            <Button
              className="ifes-btn-warning"
              type="primary"
              onClick={() => {
                // Lógica de emissão de relatório em Excel
              }}
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <FileExcelOutlined className="ifes-icon" />
              <span style={{ marginLeft: "5px" }}>Emitir Excel</span>
            </Button>
          </div>
        </div>
      ),
      children: (
        <div


        >
          <Form
            form={formFilter}
            layout="vertical"

          >

            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item name="período" label="Periodo">
                  <Select
                    placeholder="Selecione um periodo"
                    style={{ width: "100%" }}
                  >
                    {tiposAcoes?.map((option: any) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.nome}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="tipoAcao" label="Tipo Ação">
                  <Select
                    placeholder="Selecione um tipo ação"
                    style={{ width: "100%" }}
                  >
                    {tiposAcoes?.map((option: any) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.nome}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="projeto" label="Projeto">
                  <Select
                    placeholder="Selecione um projeto"
                    style={{ width: "100%" }}
                  >
                    {tiposAcoes?.map((option: any) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.nome}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>


            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item name="inicio" label="Data Inicio">
                  <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" placeholder="selecione a data início" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="termino" label="Data de Término">
                  <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" placeholder="selecione a data de término" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="participantes" label="Participantes">
                  <Select
                    placeholder="Selecione um projeto"
                    style={{ width: "100%" }}
                    showSearch
                  >
                    {tiposAcoes?.map((option: any) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.nome}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>


          </Form>
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: "Ano",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Tipo de Ação",
      dataIndex: "type",
      key: "type",
    },
  ];


  const getTiposAcoes = async () => {
    setLoading(true);
    try {
      const response: ActionType[] = await get("tipoAcoes");
      setTiposAcoes(response);
    } catch (error) {
      console.error("Erro ao obter instituições:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTiposAcoes();
  }, []);

  return (
    <div>
      <div className="" style={{ flex: 1, marginBottom: "1rem" }}>
        <Collapse
          accordion
          items={items}
          activeKey={["1"]}
          defaultActiveKey={["1"]}

        />
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  );
};

export default EmitirRelatorio;

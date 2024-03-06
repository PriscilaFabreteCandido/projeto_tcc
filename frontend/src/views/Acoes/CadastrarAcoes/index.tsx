import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  TreeSelect,
  Upload,
} from "antd";

import "../styles.css";
import {
  BankOutlined,
  CloseOutlined,
  EyeOutlined,
  SaveOutlined,
  SolutionOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useState } from "react";

const { Option } = Select;

export default function CadastrarAcoes() {
  const [form] = Form.useForm();
  const [equipeExecucaoOptions, setEquipeExecucaoOptions] = useState<any[]>();
  const [tiposAcoesOptions, setTiposAcoesOptions] = useState<any>([
    {
      title: "Projeto",
      value: "Projeto",
      children: [
        {
          title: "Curso",
          value: "Curso",
        },
        {
          title: "Oficina",
          value: "Oficina",
        },
        {
          title: "Palestra",
          value: "Palestra",
        },
        {
          title: "Visitas Guiadas",
          value: "Visitas Guiadas",
        },
      ],
    },
    {
      title: "Cursos",
      value: "Cursos",
    },
    {
      title: "Oficinas",
      value: "Oficinas",
    },
    {
      title: "Palestras",
      value: "Palestras",
    },
    {
      title: "Visitas Guiadas",
      value: "Visitas Guiadas",
    },
  ]);
  const [selectedTipoAcoes, setSelectedTipoAcoes] = useState<any>();

  const salvarForm = async () => {
    try {
      const values = await form.validateFields();
      // Faça algo com os valores, como enviar para o servidor
    } catch (errorInfo) {}
  };

  const onFinish = () => {
    //
  };

  const navigate = useNavigate();

  return (
    <>
      <h3 style={{ paddingBottom: "1rem" }}>Cadastrar Ações</h3>
      <Divider orientation="left" plain>
        <h3>Informações Gerais</h3>
      </Divider>
      <Form onFinish={onFinish}>
        <Row gutter={16}>
          {/* Primeira Linha */}
          <Col span={8}>
            <Form.Item
              label="Nome da Oficina"
              name="nomeOficina"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Público Alvo"
              name="publicoAlvo"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Data"
              name="data"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Segunda Linha */}
          <Col span={8}>
            <Form.Item
              label="Data Início"
              name="dataInicio"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Data Término"
              name="dataTermino"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Local"
              name="local"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Terceira Linha */}
          <Col span={8}>
            <Form.Item
              label="Endereço (CEP)"
              name="enderecoCep"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Instituição Atendida"
              name="instituicaoAtendida"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Qtde de Participantes"
              name="qtdeParticipantes"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Quarta Linha */}
          <Col span={12}>
            <Form.Item
              label="Participantes (Anexar PDF)"
              name="participantesPdf"
            >
              <Upload>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>

              <Button type="primary" icon={<EyeOutlined />}>
                Visualizar Participantes
              </Button>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Equipe de Execução" name="equipeExecucao">
              <Select
                mode="multiple"
                placeholder="Selecione os membros da equipe"
                style={{ width: "100%" }}
              >
                {equipeExecucaoOptions?.map((membro) => (
                  <Option key={membro.id} value={membro.nome}>
                    {membro.nome}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Divider orientation="left" plain>
        <h3>Tipo Ação</h3>
      </Divider>

      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        {/* Equipe de Execução */}
        <Form.Item label="Tipo Ação" name="tipoAcao">
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Selecione"
            allowClear
            treeDefaultExpandAll
            onChange={() => {}}
            treeData={tiposAcoesOptions}
          />
        </Form.Item>

        <Row gutter={16}>
          {/* Primeira Linha */}
          <Col span={8}>
            {/* Turma */}
            <Form.Item label="Turma" name="turma">
              <TreeSelect
                showSearch
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="Selecione"
                allowClear
                treeDefaultExpandAll
                onChange={() => {}}
                treeData={[
                  { label: "Turma A", value: "Turma A" },
                  { label: "Turma B", value: "Turma B" },
                  // Adicione outras turmas conforme necessário
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* Período Semestre */}
            <Form.Item label="Período Semestre" name="periodoSemestre">
              <TreeSelect
                showSearch
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="Selecione"
                allowClear
                treeDefaultExpandAll
                onChange={() => {}}
                treeData={[
                  { label: "Semestre 1", value: "Semestre 1" },
                  { label: "Semestre 2", value: "Semestre 2" },
                  // Adicione outros períodos semestre conforme necessário
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* Carga Horária */}
            <Form.Item label="Carga Horária" name="cargaHoraria">
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Primeira Linha */}
          <Col span={8}>
            {/* Modalidade */}
            <Form.Item label="Modalidade" name="modalidade">
              <Input></Input>
            </Form.Item>
          </Col>

          <Col span={8}>
            {/* Número do Processo */}
            <Form.Item label="Número do Processo" name="numeroProcesso">
              <TreeSelect
                showSearch
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="Selecione"
                allowClear
                treeDefaultExpandAll
                onChange={() => {}}
                treeData={[
                  { label: "123456", value: "123456" },
                  { label: "789012", value: "789012" },
                  // Adicione outros números de processo conforme necessário
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            {/* Carga Horária */}
            <Form.Item label="Carga Horária" name="cargaHoraria">
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Primeira Linha */}
          <Col span={8}>
            {/* Data Inicio */}
            <Form.Item
              label="Data Inicio"
              name="dataInicio"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* Data fim */}
            <Form.Item
              label="Data Fim"
              name="dataFim"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* Público Alvo */}
            <Form.Item label="Público Alvo" name="publicoAlvo">
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

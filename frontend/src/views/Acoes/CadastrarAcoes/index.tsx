import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  TimePicker,
  TreeSelect,
  Upload,
} from "antd";

import "../styles.css";
import {
  ApartmentOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  SolutionOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useState } from "react";
import moment from "moment";

const { Option } = Select;

export default function CadastrarAcoes() {
  const [form] = Form.useForm();
  const [selectedTipoAcao, setSelectedTipoAcao] = useState<string>("");
  const [tiposAcoesOptions, setTiposAcoesOptions] = useState<any>([
    {
      title: "Curso",
      value: "Curso",
    },
    {
      title: "Projeto",
      value: "Projeto",
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
    {
      title: "Evento",
      value: "Evento",
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

  const eventos = [
    {
      value: 'Evento 1',
      title: 'Evento 1',
      children: [
        {
          value: 'Evento 1-0',
          title: 'Evento 1-0',
        },
        {
          value: 'Evento 1-1',
          title: 'Evento 1-1',
          children: [
            {
              value: 'leaf3',
              title: <b style={{ color: '#08c' }}>leaf3</b>,
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <h3 style={{ paddingBottom: "1rem" }}>Cadastrar Ações</h3>

      <Divider orientation="left" plain style={{ borderColor: "#333" }}>
        <h3>
          <ApartmentOutlined /> Tipo de Ação
        </h3>
      </Divider>

      <Form>
        {/* Equipe de Execução */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Tipo Ação"
              name="tipoAcao"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecione um projeto!",
                },
              ]}
            >
              <Select
                onChange={(e) => {
                  setSelectedTipoAcao(e);
                }}
              >
                {tiposAcoesOptions.map((option: any) => (
                  <Select.Option key={option.value} value={option.title}>
                    {option.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Projeto" name="projeto">
              <Select placeholder="Selecione um projeto" disabled={selectedTipoAcao == "Projeto"}>
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
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Evento" name="evento">
              <TreeSelect
              disabled={selectedTipoAcao == "Projeto"}
                showSearch
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="Selecione um evento"
                allowClear
                treeDefaultExpandAll
                treeData={eventos}
              />
            </Form.Item>
          </Col>
        </Row>

        {selectedTipoAcao == "Curso" && (
          <>
            <Row gutter={16}>
              {/* Primeira Linha */}
              <Col span={8}>
                {/* Turma */}
                <Form.Item label="Turma" name="turma" required>
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
                {/* Modalidade */}
                <Form.Item label="Modalidade" name="modalidade" required>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              {/* Primeira Linha */}
              <Col span={8}>
                {/* Horário de Início */}
                <Form.Item
                  label="Horário de Início"
                  name="inicio"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o horário de início!",
                    },
                  ]}
                >
                  <TimePicker
                    format="HH:mm"
                    placeholder="00:00"
                    // defaultValue={moment("00:00", "HH:mm")}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                {/* Horário de Término */}
                <Form.Item
                  label="Horário de Término"
                  name="fim"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o horário de término!",
                    },
                  ]}
                >
                  <TimePicker
                    format="HH:mm"
                    placeholder="00:00"
                    // defaultValue={moment("00:00", "HH:mm")}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                {/* Carga Horária */}
                <Form.Item
                  label="Carga Horária"
                  name="cargaHoraria"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira a carga horária!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              {/* Primeira Linha */}
              <Col span={8}>
                {/* Número do Processo */}
                <Form.Item
                  label="Número do Processo"
                  name="numeroProcesso"
                  required
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}></Col>

              <Col span={8}></Col>
            </Row>
          </>
        )}
      </Form>

      <Divider orientation="left" plain style={{ borderColor: "#333" }}>
        <h3>
          <InfoCircleOutlined /> Informações Gerais
        </h3>
      </Divider>

      <Form onFinish={onFinish}>
        <Row gutter={16}>
          {/* Primeira Linha */}
          <Col span={10}>
            <Form.Item
              label="Nome da Ação"
              name="nomeAcao"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Público Alvo"
              name="publicoAlvo"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Ano"
              name="ano"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input type="number" />
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
              label="Endereço"
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
              <TreeSelect
                showSearch
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="Selecione"
                allowClear
                treeDefaultExpandAll
                onChange={() => {}}
                treeData={[
                  { label: "Instituição A", value: "Instituição A" },

                  // Adicione outras turmas conforme necessário
                ]}
              />
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
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Documentos (Anexar PDF/Excel/Doc)"
              name="documentos"
            >
              <Upload>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

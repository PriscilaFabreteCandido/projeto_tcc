import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Spin,
  TimePicker,
  TreeSelect,
  Upload,
  message,
} from "antd";

import "../styles.css";
import {
  ApartmentOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { get, post, put } from "../../../api/axios";
import { modalidades } from "../../../data/modalidades";

const { Option } = Select;

export interface AcaoContextDataType {
  projetos: any[];
  eventos: any[];
  turmas: any[];
  periodos: any[];
  tipoAcoes: any[];
  instituicoes: any[];
}

export default function CadastrarAcoes() {
  const [form] = Form.useForm();
  const [selectedTipoAcao, setSelectedTipoAcao] = useState<string>("");
  const [tiposAcoesOptions, setTiposAcoesOptions] = useState<any[]>([
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

  const [acaoContexData, setAcaoContexData] = useState<AcaoContextDataType>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = () => {
    //
  };

  const getContextData = async () => {
    setLoading(true);
    try {
      const response: AcaoContextDataType = await get("acoes/contextData");
      setAcaoContexData(response);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContextData();
  }, []);

  const handleCadastrar = async () => {
    console.log("feddd");
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const acaoToCreateOrEdit = {
        nome: values.nomeAcao,
        tipoAcao: values.tipoAcao,
        projeto: values.projeto,
        evento: values.evento,
        turma: values.turma,
        periodoSemestre: values.periodoSemestre,
        modalidade: values.modalidade,
        inicio: values.inicio,
        fim: values.fim,
        numeroProcesso: values.numeroProcesso,
        publicoAlvo: values.publicoAlvo,
        dataInicio: values.dataInicio,
        dataTermino: values.dataTermino,
        instituicaoAtendida: values.instituicaoAtendida,
        ano: values.ano,
        enderecoCep: values.enderecoCep,
        qtdeParticipantes: values.qtdeParticipantes,
        cargaHoraria: values.cargaHoraria,
        participantesPdf: values.participantesPdf?.file,
        documentos: values.documentos?.fileList,
      };

      console.log("acaoToCreateOrEdit", acaoToCreateOrEdit);
      if (!values.id) {
        await post("acoes/create", acaoToCreateOrEdit);
        message.success("Ação criada com sucesso");
        // Adicionar lógica adicional se necessário, como atualizar a lista de ações
      } else {
        await put(`acoes/update/${values.id}`, acaoToCreateOrEdit);
        message.success("Ação editada com sucesso");
        // Adicionar lógica adicional se necessário, como atualizar a lista de ações
      }

      navigate("/Consultar Ações");
    } catch (error: any) {
      console.error("Erro ao cadastrar/editar ação:", error);
    }
  };

  return (
    <Spin spinning={loading}>
      <h4 style={{ paddingBottom: "1rem" }} className="poppins-bold">
        Cadastrar Ações
      </h4>

      <Divider
        orientation="left"
        plain
        style={{ borderWidth: 3, borderColor: "#000" }}
      >
        <h5 className="poppins-bold">
          <ApartmentOutlined /> Tipo de Ação
        </h5>
      </Divider>

      <Form form={form}>
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
                  setSelectedTipoAcao(
                    acaoContexData?.tipoAcoes.find((x) => x.id == e).nome
                  );
                }}
              >
                {acaoContexData?.tipoAcoes?.map((option: any) => (
                  <Select.Option key={option.value} value={option.id}>
                    {option.nome}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Projeto" name="projeto">
              <Select
                placeholder="Selecione um projeto"
                disabled={selectedTipoAcao == "Projeto"}
              >
                {acaoContexData?.projetos?.map((option) => (
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
                treeData={acaoContexData?.eventos}
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
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                {/* Período Semestre */}
                <Form.Item label="Período Semestre" name="periodoSemestre">
                  <Select placeholder="Selecione um projeto">
                    {acaoContexData?.periodos?.map((option) => (
                      <Select.Option key={option.id} value={option.nome}>
                        {option.periodo == "-"
                          ? option.ano
                          : option.ano + "/" + option.periodo}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                {/* Modalidade */}
                <Form.Item label="Modalidade" name="modalidade" required>
                  <Select placeholder="Selecione um projeto">
                    {modalidades?.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
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

              <Col span={8}></Col>
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

        <Divider
          orientation="left"
          plain
          style={{ borderWidth: 3, borderColor: "#000" }}
        >
          <h5 className="poppins-bold">
            <InfoCircleOutlined /> Informações Gerais
          </h5>
        </Divider>

        <Row gutter={16}>
          {/* Primeira Linha */}
          <Col span={14}>
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
        </Row>

        <Row gutter={16}>
          {/* Segunda Linha */}
          <Col span={6}>
            <Form.Item
              label="Data Início"
              name="dataInicio"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Data Término"
              name="dataTermino"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Instituição Atendida"
              name="instituicaoAtendida"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Select
                onChange={(e) => {
                  setSelectedTipoAcao(e);
                }}
              >
                {acaoContexData?.instituicoes?.map((option: any) => (
                  <Select.Option key={option.value} value={option.id}>
                    {option.nome}
                  </Select.Option>
                ))}
              </Select>
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
          {/* Terceira Linha */}
          <Col span={16}>
            <Form.Item
              label="Endereço de realização"
              name="enderecoCep"
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
              <Input type="text" placeholder="00:00" />
            </Form.Item>
          </Col>
          <Col span={8}></Col>
          <Col span={8}></Col>
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

        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button type="default" onClick={() => {}}>
            <CloseOutlined /> Cancelar
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: "8px" }}
            onClick={() => handleCadastrar()}
          >
            Cadastrar <PlusOutlined />
          </Button>
        </div>
      </Form>
    </Spin>
  );
}

import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Spin, message } from "antd";
import { useLocation, useNavigate } from "react-router";
import { InstituicaoType } from "../Instituicao";
import { get, post, put } from "../../../api/axios";
import { niveisEscolaridade } from "../../../data/niveisdeescolaridade";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { vinculos } from "../../../data/vinculos";
import moment from "moment";


export interface FuncoesType {
  id: number;
  nome: string;
}

export interface GraduacaoType {
  id: number;
  nome: string;
}

const CadastrarPessoa = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const [instituicoes, setInstituicoes] = useState<InstituicaoType[]>([]);
  const [cursos, setCursos] =useState<any[]>([])
  const [funcoes, setFuncoes] = useState<GraduacaoType[]>([]);
  const { pessoa } = location.state || {};
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    getContextData();
  }, []);

  const getContextData = async () => {
    setLoading(true);
    try {
      const response = await get("pessoas/contextData");
      
      setInstituicoes(response.instituicoes);
      setFuncoes(response.funcoes);
      setCursos(response.cursos);
    } catch (error) {
      console.error("Erro ao obter instituições:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("Cadastros/Pessoas");
  };

  useEffect(() => {
    if (pessoa) {
      form.setFieldsValue({
        nome: pessoa.nome,
        cpf: pessoa.cpf,
        matricula: pessoa.matricula,
        dataNascimento: pessoa.dtNascimento ? moment(pessoa.dataNascimento) : null,
        telefone: pessoa.telefone,
        curso: pessoa.curso,
        instituicao: pessoa.instituicao,
        graduacao: pessoa.graduacao,
        funcao: pessoa.funcao,
        vinculo: pessoa.vinculo,
        email: pessoa.email,
        nivelEscolaridade: pessoa.nivelEscolaridade,
      });
    }
  }, [pessoa, form]);

  const handleCadastrar = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
  
      const pessoaData = {
        nome: values.nome,
        cpf: values.cpf,
        matricula: values.matricula,
        dtNascimento: values.dtNascimento,
        telefone: values.telefone,
        email: values.email,
        instituicao: {
          id: values.instituicao
        },
        nivelEscolaridade: values.nivelEscolaridade,
        funcao: {
          id: values.funcao
        },
        vinculo: values.vinculo,
        curso: {
          id: values.curso
        },
        id: pessoa ? pessoa.id : null,
      };
  
      if (!pessoa) {
        await post("pessoas/create", pessoaData);
        message.success("Pessoa criada com sucesso");
      } else {
        await put(`pessoas/update/${pessoa.id}`, pessoaData);
        message.success("Pessoa editada com sucesso");
      }
  
      navigate("/Cadastros/Pessoas");
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
      message.error("Erro ao processar o formulário");
    }
  };
  

  return (
    <Spin spinning={loading}>
      <Form form={form} layout="vertical">
        <div style={{ marginBottom: "20px" }}>
          <h4 className="poppins-bold">Cadastrar Pessoa</h4>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item
                name="nome"
                label="Nome"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o nome da pessoa!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item
                name="cpf"
                label="CPF"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o CPF da pessoa!",
                  },
                ]}
              >
                <Input placeholder="000.000.000-00" />
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item
                name="matricula"
                label="Matrícula"

              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item
                name="dtNascimento"
                label="Data de Nascimento"
                rules={[
                  {
                    required: true,
                    message:
                      "Por favor, insira a data de nascimento da pessoa!",
                  },
                ]}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
              </Form.Item>
            </div>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item
                name="instituicao"
                label="Instituição"
                rules={[
                  {
                    required: true,
                    message: "Por favor, selecione a instituição da pessoa!",
                  },
                ]}
              >
                <Select>
                  {instituicoes.map((option) => (
                    <Select.Option key={option.id} value={option.nome}>
                      {option.nome}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item
                name="telefone"
                label="Telefone"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o telefone da pessoa!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o email da pessoa!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item
                name="nivelEscolaridade"
                label="Nivel de Escolaridade"
                rules={[
                  {
                    required: true,
                    message: "Por favor, selecione a graduação da pessoa!",
                  },
                ]}
              >
                <Select>
                  {niveisEscolaridade.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item
                name="funcao"
                label="Função"
                rules={[
                  {
                    required: true,
                    message: "Por favor, selecione a função da pessoa!",
                  },
                ]}
              >
                <Select>
                  {funcoes.map((option) => (
                    <Select.Option key={option.id} value={option.nome}>
                      {option.nome}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item
                name="vinculo"
                label="Vínculo"
                rules={[
                  {
                    required: true,
                    message: "Por favor, selecione a vinculo da pessoa!",
                  },
                ]}
              >
                <Select>
                  {vinculos.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item name="curso" label="Curso">
              <Select>
                  {cursos.map((option) => (
                    <Select.Option key={option.id} value={option.nome}>
                      {option.nome}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div style={{ flex: 1, marginRight: "10px" }}></div>
          </div>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button type="default" onClick={handleCancel}>
              <CloseOutlined /> Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "8px" }}
              onClick={() =>  handleCadastrar()}
            >
              Cadastrar <PlusOutlined />
            </Button>
          </div>
        </div>
      </Form>
    </Spin>
  );
};

export default CadastrarPessoa;

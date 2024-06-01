import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin, Switch, message } from "antd";
import { useLocation, useNavigate } from "react-router";
import { InstituicaoType } from "../Instituicao";
import { get, post, put } from "../../../api/axios";
import { niveisEscolaridade } from "../../../data/niveisdeescolaridade";
import { cursos } from "../../../data/cursos";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

export interface VinculoType {
  id: number;
  nome: string;
}

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
  const [vinculos, setVinculos] = useState<VinculoType[]>([]);
  const [instituicoes, setInstituicoes] = useState<InstituicaoType[]>([]);
  const [cursos, setCursos] =useState<any[]>()
  const [funcoes, setFuncoes] = useState<GraduacaoType[]>([]);
  const { pessoa } = location.state || {};
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (pessoa) {
      form.setFieldsValue({
        nome: pessoa.nome,
        cpf: pessoa.cpf,
        matricula: pessoa.matricula,
        dataNascimento: pessoa.dataNascimento,
        telefone: pessoa.telefone,
        curso: pessoa.curso,
        instituicao: pessoa.instituicao,
        graduacao: pessoa.graduacao,
        funcao: pessoa.funcao,
        ativo: pessoa.ativo,
      });
    }
  }, [pessoa, form]);

  useEffect(() => {
    getContextData();
  }, []);

  const getContextData = async () => {
    setLoading(true);
    try {
      const response = await get("pessoas/getContextData");
      
      setInstituicoes(response.instituicoes);
      setVinculos(response.vinculos);
      setFuncoes(response.funcoes);
      setFuncoes(response.cursos);
    } catch (error) {
      console.error("Erro ao obter instituições:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const pessoaData = {
        nome: values.nome,
        cpf: values.cpf,
        matricula: values.matricula,
        dataNascimento: values.dataNascimento,
        email: values.email,
        instituicao: values.instituicao,
        id: pessoa ? pessoa.id : null,
      };

      if (!pessoa) {
        await post("pessoas/create", pessoaData);

        message.success("Pessoa criada com sucesso");
      } else {
        await put(`pessoas/update/${pessoa.id}`, pessoaData);

        message.success("Pessoa editada com sucesso");
      }
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const handleCancel = () => {
    navigate("Cadastros/Pessoas");
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
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira a matrícula da pessoa!",
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
                name="dataNascimento"
                label="Data de Nascimento"
                rules={[
                  {
                    required: true,
                    message:
                      "Por favor, insira a data de nascimento da pessoa!",
                  },
                ]}
              >
                <Input />
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
                name="graduacao"
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
                    <Select.Option key={option.id} value={option.nome}>
                      {option.nome}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item name="curso" label="Curso">
                <Select>
                  {cursos.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
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

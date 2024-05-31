import React, { useState } from "react";
import { Form, Input, Select, Switch } from "antd";
import { useLocation } from "react-router";
import { InstituicaoType } from "../Instituicao";
import { get } from "../../../api/axios";
import { niveisEscolaridade } from "../../../data/niveisdeescolaridade";
import { cursos } from "../../../data/cursos";

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
  const [funcoes, setFuncoes] = useState<GraduacaoType[]>([]);
  const { pessoa } = location.state || {};
  const [loading, setLoading] = useState<boolean>(false);

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

  const getContextData = async () => {
    setLoading(true);
    try {
      const response: any = await get("pessoas/getContextData");
      setInstituicoes(response.instituicoes);
      setVinculos(response.vinculos);
      setFuncoes(response.funcoes);
    } catch (error) {
      console.error("Erro ao obter instituições:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical">
      <div style={{ marginBottom: "20px" }}>
        <h4 className="poppins-bold">Dados Pessoais</h4>
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
              <Input placeholder="000.000.000-00"/>
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
                  message: "Por favor, insira a data de nascimento da pessoa!",
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
      </div>
    </Form>
  );
};

export default CadastrarPessoa;

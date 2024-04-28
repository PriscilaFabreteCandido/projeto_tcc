import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Switch } from "antd";
import { useLocation } from "react-router";
import { TipoInstituicaoType } from ".";
import { get } from "../../../api/axios";

const CadastrarInstituicao = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const [tipoInstituicoes, setTipoInstituicoes] = useState<
    TipoInstituicaoType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { instituicao } = location.state || {};

  React.useEffect(() => {
    if (instituicao) {
      form.setFieldsValue({
        nome: instituicao.nome,
        cep: instituicao.cep,
        estado: instituicao.estado,
        bairro: instituicao.bairro,
        rua: instituicao.rua,
        numero: instituicao.numero,
        descricao: instituicao.descricao,
        email: instituicao.email,
        tipoInstituicao: instituicao.tipoInstituicao,
      });
    }
  }, [instituicao, form]);

  const getTipoInstituicoes = async () => {
    setLoading(true);
    try {
      const response: TipoInstituicaoType[] = await get("tipoInstituicoes");
      if (response?.length) setTipoInstituicoes(response);
    } catch (error) {
      console.error("Erro ao obter tipo instituições:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("veio aqui");
    getTipoInstituicoes();
  }, []);

  const handleCancelar = () => {
    // Adicione aqui a lógica para cancelar
    console.log("Operação cancelada!");
  };

  const handleCadastrar = () => {
    // Adicione aqui a lógica para cadastrar
    console.log("Cadastro realizado com sucesso!");
  };


  return (
    <div>
      <Form form={form} layout="vertical">
        <div style={{ marginBottom: "20px" }}>
          <h3>Dados da Instituição</h3>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item
                name="nome"
                label="Nome"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o nome da instituição!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item
                name="cep"
                label="CEP"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o CEP da instituição!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item
                name="estado"
                label="Estado"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o estado da instituição!",
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
                name="bairro"
                label="Bairro"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o bairro da instituição!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item
                name="rua"
                label="Rua"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira a rua da instituição!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item
                name="numero"
                label="Número"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o número da instituição!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Form.Item
              name="descricao"
              label="Descrição"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a descrição da instituição!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item
                name="tipoInstituicao"
                label="Tipo de Instituição"
                rules={[
                  {
                    required: true,
                    message: "Por favor, selecione o tipo de instituição!",
                  },
                ]}
              >
                <Select>
                  {tipoInstituicoes.map((option) => (
                    <Select.Option key={option.id} value={option.nome}>
                      {option.nome}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="default" onClick={handleCancelar}>
          Cancelar
        </Button>
        <Button type="primary" onClick={handleCadastrar}>
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

export default CadastrarInstituicao;

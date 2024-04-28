import React from "react";
import { Form, Input, Select, Switch } from "antd";
import { useLocation } from "react-router";

const InstituicoesOptions = [
  { id: 1, nome: "IFES" },
  // Adicione outras opções conforme necessário
];

const GraduacaoOptions = [
  { id: 1, nome: "Ensino Médio" },
  { id: 2, nome: "Graduação" },
  { id: 3, nome: "Pós-Graduação" },
  // Adicione outras opções conforme necessário
];

const FuncoesOptions = [
  { id: 1, nome: "Estudante" },
  { id: 2, nome: "Professor" },
  // Adicione outras opções conforme necessário
];

const CadastrarPessoa = () => {
  const [form] = Form.useForm();
  const location = useLocation();
 
  const { pessoa } = location.state || {};
  
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

  return (
    <Form form={form} layout="vertical">
      <div style={{ marginBottom: "20px" }}>
        <h3>Dados Pessoais</h3>
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
              <Input />
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
              name="curso"
              label="Curso"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a curso da pessoa!",
                },
              ]}
            >
              <Input />
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
                {InstituicoesOptions.map((option) => (
                  <Select.Option key={option.id} value={option.nome}>
                    {option.nome}
                  </Select.Option>
                ))}
              </Select>
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
                {GraduacaoOptions.map((option) => (
                  <Select.Option key={option.id} value={option.nome}>
                    {option.nome}
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
                {FuncoesOptions.map((option) => (
                  <Select.Option key={option.id} value={option.nome}>
                    {option.nome}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h3>Informações de Login</h3>
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
              name="senha"
              label="Senha"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a senha da pessoa!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <div style={{ flex: 1,  marginRight: "10px"}}>
            <Form.Item
              name="confirmarSenha"
              label="Confirmar Senha"
              dependencies={["senha"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Por favor, confirme a senha!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("senha") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("As senhas inseridas não conferem!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>

          <div style={{ flex: 0.5, marginRight: '10px' }}>
            <Form.Item name="ativo" label="Ativo" valuePropName="checked">
              <Switch />
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CadastrarPessoa;

import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Table,
  Tooltip,
  Modal,
  Form,
  message,
  Popconfirm,
  Space,
  Select,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";
import { Link, useNavigate } from "react-router-dom";

interface PessoaType {
  key: React.Key;
  id: number;
  nome: string;
  cpf: string;
  matricula: string;
  dataNascimento: string;
  email: string;
  instituicao: string;
  graduacao: string;
}

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

const Pessoas: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [pessoaToEdit, setPessoaToEdit] = useState<PessoaType | null>(null);
  const [pessoas, setPessoas] = useState<PessoaType[]>([
    {
      key: 1,
      id: 1,
      nome: "Fulano",
      cpf: "111.222.333.44-55",
      matricula: "20211564452",
      dataNascimento: "01/02/2002",
      email: "fulano@gmail.com",
      instituicao: "IFES",
      graduacao: "Ensino Médio",
    },
    {
      key: 2,
      id: 2,
      nome: "Maria",
      cpf: "222.333.444.55-66",
      matricula: "20211568888",
      dataNascimento: "10/05/1995",
      email: "maria@gmail.com",
      instituicao: "UFES",
      graduacao: "Graduação",
    },
    {
      key: 3,
      id: 3,
      nome: "João",
      cpf: "333.444.555.66-77",
      matricula: "20211569999",
      dataNascimento: "20/11/1988",
      email: "joao@gmail.com",
      instituicao: "IFMG",
      graduacao: "Pós Graduação",
    },
  ]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setPessoaToEdit(null);
    setIsOpenModal(false);
  };

  const getPessoas = async () => {
    setLoading(true);
    try {
      const response: PessoaType[] = await get("pessoas");
      setPessoas(response);
    } catch (error) {
      console.error("Erro ao obter pessoas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPessoas();
  }, []);

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
        id: pessoaToEdit ? pessoaToEdit.id : null,
      };

      if (!pessoaToEdit) {
        const response = await post("pessoas/create", pessoaData);
        setPessoas([...pessoas, response]);
        message.success("Pessoa criada com sucesso");
      } else {
        const response = await put(
          `pessoas/update/${pessoaToEdit.id}`,
          pessoaData
        );
        setPessoas(
          pessoas.map((pessoa) =>
            pessoa.id === response.id ? response : pessoa
          )
        );
        message.success("Pessoa editada com sucesso");
      }

      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await remove(`pessoas/delete/${id}`);
      setPessoas(pessoas.filter((pessoa) => pessoa.id !== id));
      message.success("Pessoa excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
    }
  };

  const columns: ColumnsType<PessoaType> = [
    {
      title: "Nome",
      dataIndex: "nome",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
    },
    {
      title: "Matrícula",
      dataIndex: "matricula",
    },
    {
      title: "Data de Nascimento",
      dataIndex: "dataNascimento",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Instituição",
      dataIndex: "instituicao",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Editar">
            <Button
              className="ifes-btn-warning"
              shape="circle"
              onClick={() => {
                setPessoaToEdit(record);
                form.setFieldsValue({
                  nome: record.nome,
                  cpf: record.cpf,
                  matricula: record.matricula,
                  dataNascimento: record.dataNascimento,
                  email: record.email,
                  instituicao: record.instituicao,
                });
                setIsOpenModal(true);
              }}
            >
              <EditOutlined className="ifes-icon" />
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza que deseja excluir esta pessoa?"
              onConfirm={() => onDelete(record.id)}
              okText="Sim"
              cancelText="Cancelar"
            >
              <Button
                className="ifes-btn-danger"
                shape="circle"
                onClick={() => {}}
              >
                <DeleteOutlined className="ifes-icon" />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Header */}
      <CardFooter>
        <div className="flex justify-content-between">
          {/* Filtros */}
          <div className="flex filtros-card">
            {/* Inputs para filtrar */}
            <Input
              placeholder="CPF"
              style={{ width: "200px", marginRight: "10px" }}
            />
            <Input
              placeholder="Nome"
              style={{ width: "200px", marginRight: "10px" }}
            />
            <Input
              placeholder="Matricula"
              style={{ width: "200px", marginRight: "10px" }}
            />
            
          </div>

        

        <div>
          <Button
            className="senai-btn-success"
            onClick={() => {
              navigate("/Cadastros/Pessoas/Cadastrar");
            }}
          >
            <PlusOutlined className="senai-icon" />
            Adicionar
          </Button>
        </div>
        </div>
      </CardFooter>

      {/* Tabela */}
      <Table columns={columns} dataSource={pessoas} loading={loading} />

    </>
  );
};

export default Pessoas;

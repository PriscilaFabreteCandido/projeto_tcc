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



const Pessoas: React.FC = () => {
  const [pessoaToEdit, setPessoaToEdit] = useState<PessoaType | null>(null);
  const [pessoas, setPessoas] = useState<PessoaType[]>([]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  
  const handleCancel = () => {
    form.resetFields();
    setPessoaToEdit(null);

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
            className="ifes-btn-success"
            onClick={() => {
              navigate("/Cadastros/Pessoas/Cadastrar");
            }}
          >
            <PlusOutlined className="ifes-icon" />
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

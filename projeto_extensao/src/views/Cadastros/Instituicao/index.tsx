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
import { useNavigate } from "react-router";
import { colors } from "../../../global]/theme/theme";

export interface TipoInstituicaoType {
  id: number;
  nome: string;
}
export interface InstituicaoType {
  key: React.Key;
  id: number;
  nome: string;
  endereco: string;
  bairro: string;
  rua: string;
  estado: string;
  cep: string;
  numero: string;
  descricao: string;
  email: string;
  tipoInstituicao: TipoInstituicaoType;
}

const Instituicoes: React.FC = () => {
  const [instituicaoToEdit, setInstituicaoToEdit] =
    useState<InstituicaoType | null>(null);
  const [instituicoes, setInstituicoes] = useState<InstituicaoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate() as any;

  const getInstituicoes = async () => {
    setLoading(true);
    try {
      const response: InstituicaoType[] = await get("instituicoes");
      setInstituicoes(response);
    } catch (error) {
      console.error("Erro ao obter instituições:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInstituicoes();
  }, []);

  const onDelete = async (id: number) => {
    try {
      await remove(`instituicoes/delete/${id}`);
      setInstituicoes(
        instituicoes.filter((instituicao) => instituicao.id !== id)
      );
      message.success("Instituição excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir instituição:", error);
    }
  };

  const columns: ColumnsType<InstituicaoType> = [
    {
      title: "Nome",
      dataIndex: "nome",
    },
    {
      title: "Tipo Instituição",
      dataIndex: "Tipo Instituição",
    },
    {
      title: "Endereco",
      dataIndex: "endereco",
      render: (_, record) => (
        <p>{`${record.rua}, ${record.numero}, ${record.bairro}, ${record.estado}`}</p>
      ),
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
                setInstituicaoToEdit(record);
                navigate("/Cadastros/Instituições/Editar Instituição", {
                  state: { instituicao: record },
                });
              }}
            >
              <EditOutlined className="ifes-icon" />
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza que deseja excluir esta instituição?"
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
              <Input
                placeholder="Nome"
                style={{ width: "200px", marginRight: "10px" }}
              />
          </div>

          <div>
            <Button
              type="primary"
              onClick={() => {
                navigate("/Cadastros/Instituições/Cadastrar Instituição");
              }}
              value="large"
              value="large"
              icon={<PlusOutlined />}
            >
              Adicionar
            </Button>
          </div>
        </div>
      </CardFooter>

      {/* Tabela */}
      <Table columns={columns} dataSource={instituicoes} loading={loading} />
    </>
  );
};

export default Instituicoes;

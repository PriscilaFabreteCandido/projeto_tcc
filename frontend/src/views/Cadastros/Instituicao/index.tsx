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
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";

interface InstituicaoType {
  key: React.Key;
  id: number;
  nome: string;
  endereco: string;
  cep: string;
  numero: string;
  rua: string;
  avenida: string;
  estado: string;
}

const Instituicoes: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [instituicaoToEdit, setInstituicaoToEdit] =
    useState<InstituicaoType | null>(null);
  const [instituicoes, setInstituicoes] = useState<InstituicaoType[]>([
    {
      key: 1,
      id: 1,
      nome: "Instituição A",
      cep: "12345-678",
      avenida: "Avenida Principal",
      numero: "123",
      rua: "Rua das Flores",
      endereco: "Avenida Principal, 123 - Rua das Flores",
      estado: "ES"
    },
    {
      key: 2,
      id: 2,
      nome: "Instituição B",
      cep: "54321-876",
      avenida: "Avenida Secundária",
      numero: "456",
      rua: "Rua das Árvores",
      endereco: "Avenida Secundária, 456 - Rua das Árvores",
      estado: "ES"
    },
  ]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setInstituicaoToEdit(null);
    setIsOpenModal(false);
  };

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

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const instituicaoData = {
        nome: values.nome,
        endereco: values.endereco,
        cep: values.cep,
        numero: values.numero,
        rua: values.rua,
        id: instituicaoToEdit ? instituicaoToEdit.id : null,
      };

      if (!instituicaoToEdit) {
        const response = await post("instituicoes/create", instituicaoData);
        setInstituicoes([...instituicoes, response]);
        message.success("Instituição criada com sucesso");
      } else {
        const response = await put(
          `instituicoes/update/${instituicaoToEdit.id}`,
          instituicaoData
        );
        setInstituicoes(
          instituicoes.map((instituicao) =>
            instituicao.id === response.id ? response : instituicao
          )
        );
        message.success("Instituição editada com sucesso");
      }

      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

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
      title: "CEP",
      dataIndex: "cep",
    },
    {
      title: "Estado",
      dataIndex: "estado",
    },
    {
      title: "Avenida",
      dataIndex: "avenida",
    },
    {
      title: "Rua",
      dataIndex: "rua",
    },
  
    {
      title: "Número",
      dataIndex: "numero",
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
                form.setFieldsValue({
                  nome: record.nome,
                  endereco: record.endereco,
                  cep: record.cep,
                  numero: record.numero,
                  rua: record.rua,
                });
                setIsOpenModal(true);
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
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
              Adicionar
            </Button>
          </div>
        </div>
      </CardFooter>

      {/* Tabela */}
      <Table columns={columns} dataSource={instituicoes} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Instituição"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
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

          <Form.Item
            name="Estado"
            label="Estado"
            rules={[
              {
                required: true,
                message: "Por favor, insira o endereço da instituição!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="avenida"
            label="Avenida"
            rules={[
              {
                required: true,
                message: "Por favor, insira o endereço da instituição!",
              },
            ]}
          >
            <Input />
          </Form.Item>
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
        </Form>
      </Modal>
    </>
  );
};

export default Instituicoes;

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

interface ProjetoType {
  key: React.Key;
  id: number;
  descricao: string;
}

const ProjetosOptions = [
  { id: 1, descricao: "Letter" },
  { id: 2, descricao: "Programa-se" },
  { id: 3, descricao: "Titãs da Robótica" },
];

const Projetos: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [projetoToEdit, setProjetoToEdit] = useState<ProjetoType | null>(null);
  const [projetos, setProjetos] = useState<ProjetoType[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setProjetoToEdit(null);
    setIsOpenModal(false);
  };

  const getProjetos = async () => {
    setLoading(true);
    try {
      // Mockando os dados dos projetos
      setProjetos(ProjetosOptions.map(option => ({ key: option.id, ...option })));
    } catch (error) {
      console.error("Erro ao obter projetos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjetos();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const projetoData = {
        descricao: values.descricao,
        id: projetoToEdit ? projetoToEdit.id : null,
      };

      if (!projetoToEdit) {
        // Simulando a criação de um projeto
        const newId = projetos.length + 1;
        // setProjetos([...projetos, { key: newId, ...projetoData }]);
        message.success("Projeto criado com sucesso");
      } else {
        // Simulando a edição de um projeto
        setProjetos(
          projetos.map((projeto: any) =>
            projeto.key === projetoToEdit.key ? { ...projeto, ...projetoData } : projeto
          )
        );
        message.success("Projeto editado com sucesso");
      }

      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      // Simulando a exclusão de um projeto
      setProjetos(projetos.filter((projeto) => projeto.id !== id));
      message.success("Projeto excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
    }
  };

  const columns: ColumnsType<ProjetoType> = [
    {
      title: "Descrição",
      dataIndex: "descricao",
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
                setProjetoToEdit(record);
                form.setFieldsValue({
                  descricao: record.descricao
                });
                setIsOpenModal(true);
              }}
            >
              <EditOutlined className="ifes-icon" />
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza que deseja excluir este projeto?"
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
          <div className="flex filtros-card"></div>

          <div>
            <Button value="large" type="primary" onClick={showModal} icon={<PlusOutlined />}>
              Adicionar
            </Button>
          </div>
        </div>
      </CardFooter>

      {/* Tabela */}
      <Table columns={columns} dataSource={projetos} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Projeto"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="descricao"
            label="Descrição"
            rules={[
              { required: true, message: "Por favor, insira a descrição do projeto!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Projetos;

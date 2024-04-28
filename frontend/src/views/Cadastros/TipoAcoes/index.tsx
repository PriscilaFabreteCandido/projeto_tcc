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

interface ActionType {
  key: React.Key;
  id: number;
  descricao: string;
}

const TiposAcoesOptions = [
  { id: 1, descricao: "Curso" },
  { id: 2, descricao: "Apoio Técnico" },
  { id: 3, descricao: "Visita Guiada" },
  { id: 4, descricao: "Palestra" },
  { id: 4, descricao: "Evento" },
];

const TiposAcoes: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tipoAcaoToEdit, setTipoAcaoToEdit] = useState<ActionType | null>(null);
  const [tiposAcoes, setTiposAcoes] = useState<ActionType[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setTipoAcaoToEdit(null);
    setIsOpenModal(false);
  };

  const getTiposAcoes = async () => {
    setLoading(true);
    try {
      // Mockando os dados dos tipos de ações
      setTiposAcoes(TiposAcoesOptions.map(option => ({ key: option.id, ...option })));
    } catch (error) {
      console.error("Erro ao obter tipos de ações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTiposAcoes();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const tipoAcaoData = {
        descricao: values.descricao,
        id: tipoAcaoToEdit ? tipoAcaoToEdit.id : null,
      };

      if (!tipoAcaoToEdit) {
        // Simulando a criação de um tipo de ação
        const newId = tiposAcoes.length + 1;
        // setTiposAcoes([...tiposAcoes, { key: newId, ...tipoAcaoData }]);
        message.success("Tipo de ação criado com sucesso");
      } else {
        // Simulando a edição de um tipo de ação
        setTiposAcoes(
          tiposAcoes.map((tipoAcao: any) =>
            tipoAcao.key === tipoAcaoToEdit.key ? { ...tipoAcao, ...tipoAcaoData } : tipoAcao
          )
        );
        message.success("Tipo de ação editado com sucesso");
      }

      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      // Simulando a exclusão de um tipo de ação
      setTiposAcoes(tiposAcoes.filter((tipoAcao) => tipoAcao.id !== id));
      message.success("Tipo de ação excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir tipo de ação:", error);
    }
  };

  const columns: ColumnsType<ActionType> = [
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
                setTipoAcaoToEdit(record);
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
              title="Tem certeza que deseja excluir este tipo de ação?"
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
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
              Adicionar
            </Button>
          </div>
        </div>
      </CardFooter>

      {/* Tabela */}
      <Table columns={columns} dataSource={tiposAcoes} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Tipo de Ação"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="descricao"
            label="Descrição"
            rules={[
              { required: true, message: "Por favor, insira a descrição do tipo de ação!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TiposAcoes;

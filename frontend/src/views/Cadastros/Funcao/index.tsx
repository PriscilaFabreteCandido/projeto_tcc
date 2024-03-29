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

interface FuncaoType {
  key: React.Key;
  id: number;
  descricao: string;
}

const FuncaoOptions = [
  { id: 1, descricao: "Aluno(a) bolsista" },
  { id: 2, descricao: "Aluno(a) voluntário" },
  { id: 3, descricao: "Apoio técnico" },
  { id: 4, descricao: "Colaborador(a)" },
  { id: 5, descricao: "Coordenador(a)" },
  { id: 6, descricao: "Instrutor(a)" },
  { id: 7, descricao: "Extensionista" },
  { id: 8, descricao: "Monitor(a)" },
  { id: 9, descricao: "Organizador(a)" },
  { id: 10, descricao: "Orientador(a)" },
  { id: 11, descricao: "Palestrante" },
  { id: 12, descricao: "Professor(a)" },
];

const Funcao: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [funcaoToEdit, setFuncaoToEdit] = useState<FuncaoType | null>(null);
  const [funcoes, setFuncoes] = useState<FuncaoType[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setFuncaoToEdit(null);
    setIsOpenModal(false);
  };

  const getFuncoes = async () => {
    setLoading(true);
    try {
      // Mocando os dados das funções
      setFuncoes(FuncaoOptions.map(option => ({ key: option.id, ...option })));
    } catch (error) {
      console.error("Erro ao obter funções:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFuncoes();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const funcaoData = {
        descricao: values.descricao,
        id: funcaoToEdit ? funcaoToEdit.id : null,
      };

      if (!funcaoToEdit) {
        // Simulando a criação de uma função
        const newId = funcoes.length + 1;
        // setFuncoes([...funcoes, { key: newId, ...funcaoData }]);
        message.success("Função criada com sucesso");
      } else {
        // Simulando a edição de uma função
        setFuncoes(
          funcoes.map((funcao: any) =>
            funcao.key === funcaoToEdit.key ? { ...funcao, ...funcaoData } : funcao
          )
        );
        message.success("Função editada com sucesso");
      }

      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      // Simulando a exclusão de uma função
      setFuncoes(funcoes.filter((funcao) => funcao.id !== id));
      message.success("Função excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir função:", error);
    }
  };

  const columns: ColumnsType<FuncaoType> = [
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
                setFuncaoToEdit(record);
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
              title="Tem certeza que deseja excluir esta função?"
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
      <Table columns={columns} dataSource={funcoes} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Função"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="descricao"
            label="Descrição"
            rules={[
              { required: true, message: "Por favor, insira a descrição da função!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Funcao;

import React, { useState } from 'react';
import { Button, Modal, Form, Input, message, Steps, DatePicker, Select, InputNumber, Upload, TimePicker } from 'antd';
import { PlusOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';

const { Step } = Steps;
const { RangePicker } = DatePicker;

const MyComponent = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [cursos, setCursos] = useState([]);
  const [cursoToEdit, setCursoToEdit] = useState(null);

  const steps = [
    {
      title: 'Informações Básicas',
      content: (
        <>
          <Form.Item
            name="nome"
            label="Nome Ação"
            rules={[{ required: true, message: 'Por favor, insira o nome da ação!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="publicoAlvo"
            label="Público Alvo"
            rules={[{ required: true, message: 'Por favor, insira o público alvo!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="instituicaoAtendida"
            label="Instituição Atendida"
            rules={[{ required: true, message: 'Por favor, insira a instituição atendida!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ano"
            label="Ano"
            rules={[{ required: true, message: 'Por favor, insira o ano!' }]}
          >
            <InputNumber min={2000} max={2100} />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Detalhes da Ação',
      content: (
        <>
          <Form.Item
            name="dataInicioTermino"
            label="Data de Início e Término"
            rules={[{ required: true, message: 'Por favor, insira a data de início e término!' }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item
            name="enderecoRealizacao"
            label="Endereço de Realização"
            rules={[{ required: true, message: 'Por favor, insira o endereço de realização!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="qtdParticipantes"
            label="Quantidade de Participantes"
            rules={[{ required: true, message: 'Por favor, insira a quantidade de participantes!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="cargaHoraria"
            label="Carga Horária"
            rules={[{ required: true, message: 'Por favor, insira a carga horária!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Documentação e Horários',
      content: (
        <>
          <Form.Item
            name="documentos"
            label="Anexar Documentos"
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Anexar Documentos</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="horarioInicioFim"
            label="Horário de Início e Fim"
            rules={[{ required: true, message: 'Por favor, insira o horário de início e fim!' }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="modalidade"
            label="Modalidade"
            rules={[{ required: true, message: 'Por favor, insira a modalidade!' }]}
          >
            <Select>
              <Select.Option value="presencial">Presencial</Select.Option>
              <Select.Option value="online">Online</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="numeroProcesso"
            label="Número do Processo"
            rules={[{ required: true, message: 'Por favor, insira o número do processo!' }]}
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!cursoToEdit) {
        const resp = await post("cursos/create", values);
        setIsOpenModal(false);
        message.success("Curso criado com sucesso");
        setCursos([...cursos, resp]);
      } else {
        const resp = await put(`cursos/update/${cursoToEdit.id}`, values);
        setIsOpenModal(false);
        message.success("Curso editado com sucesso");

        const updatedCursos = cursos.map(curso =>
          curso.id === cursoToEdit.id ? resp : curso
        );
        setCursos(updatedCursos);
      }
    } catch (error) {
      console.log('Erro ao validar formulário:', error);
    }
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  return (
    <div>
      <Button type="primary" onClick={openModal}>
        <PlusOutlined /> Cadastrar
      </Button>
      <Modal
        title={cursoToEdit ? "Editar Curso" : "Cadastrar Curso"}
        visible={isOpenModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Steps current={currentStep}>
          {steps.map((item, index) => (
            <Step key={index} title={item.title} />
          ))}
        </Steps>
        <Form
          form={form}
          initialValues={cursoToEdit || {}}
          onFinish={handleOk}
        >
          {steps[currentStep].content}
          <Form.Item>
            {currentStep > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                <CloseOutlined /> Anterior
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Próximo <PlusOutlined />
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" htmlType="submit">
                Concluir <PlusOutlined />
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyComponent;

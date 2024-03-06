import { Button, Input, Select, Space, Switch, Table, Tooltip, Typography } from "antd";
import React from "react";
import "./styles.css";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, InfoOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  publicoAlvo: string;
  instituicaoAtendida: string;
  qtdeParticipantes: number;
  instituicao: string;
  numeroVagas: number;
  turno: string;
  duracao: string;
  data: any;
  dataInicio: any;
  dataTermino: any;
}

export default function Acoes() {
  const navigate = useNavigate();

  const columns: any = [
    {
      title: 'Nome da Oficina',
      dataIndex: 'nome',
      sorter: (a: any, b: any) => a.nome.length - b.nome.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Público Alvo',
      dataIndex: 'publicoAlvo',
      sorter: (a:any, b: any) => a.publicoAlvo.length - b.publicoAlvo.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Instituição Atendida',
      dataIndex: 'instituicaoAtendida',
      sorter: (a: any, b: any) => a.instituicaoAtendida.length - b.instituicaoAtendida.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Qtde de Participantes',
      dataIndex: 'qtdeParticipantes',
      sorter: (a: any, b: any) => a.qtdeParticipantes - b.qtdeParticipantes,
      sortDirections: ['descend'],
    },
    {
      title: 'Instituição',
      dataIndex: 'instituicao',
      sorter: (a: any, b: any) => a.instituicao.length - b.instituicao.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Número de Vagas',
      dataIndex: 'numeroVagas',
      sorter: (a: any, b: any) => a.numeroVagas - b.numeroVagas,
      sortDirections: ['descend'],
    },
    {
      title: 'Turno',
      dataIndex: 'turno',
      sorter: (a: any, b: any) => a.turno.length - b.turno.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Duração',
      dataIndex: 'duracao',
      sorter: (a: any, b: any) => a.duracao.length - b.duracao.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Data',
      dataIndex: 'data',
      sorter: (a: any, b: any) => a.data.length - b.data.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Data Início',
      dataIndex: 'dataInicio',
      sorter: (a: any, b: any) => a.dataInicio.length - b.dataInicio.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Data Término',
      dataIndex: 'dataTermino',
      sorter: (a: any, b: any) => a.dataTermino.length - b.dataTermino.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Ações',
      key: 'acao',
      render: (acao: any, record: any) => (
        <Space size="middle">
          {/* Adicione os ícones e a lógica de ação conforme necessário */}
          <Tooltip title="Excluir">
            <Button
              className="senai-btn-danger"
              shape="circle"
              onClick={() => {}}
            >
              <DeleteOutlined className="senai-icon" />
            </Button>
          </Tooltip>
  
          <Tooltip title="Detalhes">
            <Button
              className="senai-btn-info"
              shape="circle"
              onClick={() => {}}
            >
              <InfoOutlined className="senai-icon" />
            </Button>
          </Tooltip>
  
          <Tooltip
            title={record.ativo ? 'Desativar Exame' : 'Ativar Exame'}
          >
            <Button
              className={
                record.ativo ? 'senai-btn-success' : 'senai-btn-danger'
              }
              shape="circle"
              onClick={() => {}}
            >
              {record.ativo ? (
                <CloseCircleOutlined className="senai-icon" />
              ) : (
                <CheckCircleOutlined className="senai-icon" />
              )}
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-content-between pb-1">
        {/* Filtros */}
        <div className="flex filtros-card">
          <Input placeholder="Código E-social" style={{ width: "200px" }} />
          <Input placeholder="Exame" style={{ width: "200px" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <Typography.Text style={{ marginRight: "8px" }}>
              Ativo:
            </Typography.Text>
            <Switch defaultChecked />
          </div>
        </div>

        <div>
          <Button
            className="senai-btn-success"
            onClick={() => {
              navigate("/Ações/Cadastrar Ações");
            }}
          >
            <PlusOutlined className="senai-icon" />
            Adicionar
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={[]} />
    </>
  );
}

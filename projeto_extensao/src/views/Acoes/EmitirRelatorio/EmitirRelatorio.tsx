import React, { useState } from 'react';
import { Table, Input, Button, Space, Select } from 'antd';


const { Option } = Select;

const EmitirRelatorio = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filteredYear, setFilteredYear] = useState(null);
    const [filteredType, setFilteredType] = useState(null);

    const data = [
        {
            key: '1',
            year: '2021',
            type: 'Ação 1',
            description: 'Descrição da Ação 1',
        },
        {
            key: '2',
            year: '2022',
            type: 'Ação 2',
            description: 'Descrição da Ação 2',
        },
        // Adicione mais dados conforme necessário
    ];

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const handleYearChange = value => {
        setFilteredYear(value);
    };

    const handleTypeChange = value => {
        setFilteredType(value);
    };

    const columns = [
        {
            title: 'Ano',
            dataIndex: 'year',
            key: 'year',
           
            
        },
        {
            title: 'Tipo de Ação',
            dataIndex: 'type',
            key: 'type',
            
        },
        
    ];

    

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Select
                    placeholder="Selecione o ano"
                    onChange={handleYearChange}
                    allowClear
                >
                    <Option value="2021">2021</Option>
                    <Option value="2022">2022</Option>
                    {/* Adicione mais opções de ano conforme necessário */}
                </Select>
                <Select
                    placeholder="Selecione o tipo de ação"
                    onChange={handleTypeChange}
                    allowClear
                >
                    <Option value="Ação 1">Ação 1</Option>
                    <Option value="Ação 2">Ação 2</Option>
                    {/* Adicione mais opções de tipo conforme necessário */}
                </Select>
            </Space>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default EmitirRelatorio;

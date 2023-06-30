import React from 'react';
import styled from 'styled-components';

const Main = styled.main`
    width: 75%;
    background-color: #f5f5f5;
    padding: 20px;
    overflow-x: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    background-color: #007bff;
    color: white;
    padding: 10px;
    text-align: left;
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #ccc;
`;

const DataPreview: React.FC = () => {
    return (
        <Main>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>Column 1</TableHeader>
                        <TableHeader>Column 2</TableHeader>
                        <TableHeader>Column 3</TableHeader>
                        <TableHeader>Column 4</TableHeader>
                        <TableHeader>Column 5</TableHeader>
                        {/* ... Add more headers as needed ... */}
                    </TableRow>
                </thead>
                <tbody>
                    <TableRow>
                        <TableCell>Data 1</TableCell>
                        <TableCell>Data 2</TableCell>
                        <TableCell>Data 3</TableCell>
                        <TableCell>Data 4</TableCell>
                        <TableCell>Data 5</TableCell>
                        {/* ... Add more cells as needed ... */}
                    </TableRow>
                    {/* ... Add more rows as needed ... */}
                </tbody>
            </Table>
        </Main>
    );
};

export default DataPreview;

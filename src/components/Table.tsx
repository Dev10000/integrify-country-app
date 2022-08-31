import React, { useMemo } from 'react';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';

const rowData = [
  {
    id: '1',
    name: 'Test Name',
    email: 'test@email.com',
    password: '12345',
    photoURL: '',
    createdAt: '2022-03-10T11:51:46.607+00:00',
    active: true,
    role: 'basic',
  },
];

function Table() {
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'photoURL',
        headerName: 'Avatar',
        width: 60,
        renderCell: (params) => <Avatar src={params.row.photoURL} />,
        sortable: false,
        filterable: false,
      },
      { field: 'name', headerName: 'Nane', width: 170 },
      { field: 'email', headerName: 'Email', width: 200 },
      {
        field: 'role',
        headerName: 'Role',
        width: 100,
        type: 'singleSelect',
        valueOptions: ['basic', 'editor', 'admin'],
        editable: true,
      },
      {
        field: 'active',
        headerName: 'Active',
        width: 100,
        type: 'boolean',
        editable: true,
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format('YYY-MM-DD HH:MM:SS'),
      },
      { field: 'id', headerName: 'Id', width: 220 },
    ],
    []
  );

  return (
    <Box
      sx={{
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
        Countries List
      </Typography>
      <Paper
        sx={{
          height: 600,
          width: '100%',
        }}>
        <DataGrid
          columns={columns}
          rows={rowData}
          getRowId={(row: any) => row.id}
        />
      </Paper>
    </Box>
  );
}

export default Table;

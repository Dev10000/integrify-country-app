import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbar,
} from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCountry,
  selectSearchBarChange,
} from '../features/countriesSlice';
import { AppDispatch, RootState } from '../app/store';
import UsersActions from './UsersActions';

function Table() {
  const history = useNavigate();
  const searchInput = useSelector(selectSearchBarChange);
  const dispatch = useDispatch<AppDispatch>();
  const { flat, isLoading } = useSelector(
    (state: RootState) => state.countries
  );

  let tableDataSearchFiltered = flat;
  if (typeof searchInput === 'string') {
    tableDataSearchFiltered = flat.filter((country) =>
      country.name.toLowerCase().includes(searchInput)
    );
  }

  // const [rowId, setRowId] = useState<number | string | null>(null);
  console.log('search', searchInput);
  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    dispatch(selectCountry(params.row.name));
    history('/country');
  };

  // const setVisible = () => () => {
  //   console.log(apiRef.current.getAllColumns());
  // };
  // console.log(setVisible);
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'Row #',
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        width: 60,
        renderCell: (index) => index.api.getRowIndex(index.row.row) + 1,
      },
      {
        field: 'flagURL',
        headerName: 'Flag',
        align: 'center',
        headerAlign: 'center',
        width: 100,
        renderCell: (params) => <Avatar src={params.row.flagURL} />,
        sortable: false,
        filterable: false,
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 170,
        flex: 0.25,
      },
      {
        field: 'languages',
        headerName: 'Languages',
        wordWrap: 'wrap',
        flex: 0.25,
      },
      {
        field: 'region',
        headerName: 'Region',
        flex: 0.25,
      },
      {
        field: 'population',
        headerName: 'Population',
        autoPageSize: true,
        flex: 0.25,
      },
      {
        field: 'actions',
        headerName: 'Add to Cart',
        headerAlign: 'center',
        type: 'actions',
        renderCell: (params) => (
          <UsersActions {...{ params /* rowId, setRowId */ }} />
        ),
      },
    ],
    [
      /* rowId */
    ]
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
          components={{ Toolbar: GridToolbar }}
          loading={isLoading}
          columns={columns}
          rows={tableDataSearchFiltered}
          // rows={[]}
          getRowId={(row) => row.row}
          /* onCellEditCommit={(params) => setRowId(params.id)} */
          onRowClick={handleRowClick}
        />
      </Paper>
    </Box>
  );
}

export default Table;

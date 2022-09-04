/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo } from 'react';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCountriesThunk } from '../features/counter/countriesSlice';
import { AppDispatch, RootState } from '../app/store';
import UsersActions from './UsersActions';

function Table() {
  const dispatch = useDispatch<AppDispatch>();
  const { countries } = useSelector((state: RootState) => state);
  // const [rowId, setRowId] = useState<number | string | null>(null);

  useEffect(() => {
    dispatch(fetchCountriesThunk());
  }, [dispatch]);

  // const countryMapping = (data: any): any => {
  //   let mapped;
  //   if (data) {
  //     mapped = data.map((country: any, index: any): any => ({
  //       name: country.name.common,
  //       population: country.population,
  //       languges: JSON.stringify(Object.values(country.languages)),
  //       region: country.region,
  //       flag: country.flags.png,
  //       ccn3: country.ccn3,
  //       row: index.toString(),
  //     }));
  //   }
  //   console.log('mapped', mapped);
  //   return mapped;
  // };

  console.log('items', countries.items);
  // console.log('mapping:', countryMapping(countries.items));

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'Row ##',
        filterable: false,
        renderCell: (index) => index.api.getRowIndex(index.row.row) + 1,
      },
      {
        field: 'flagURL',
        headerName: 'Flag',
        width: 60,
        renderCell: (params) => <Avatar src={params.row.flagURL} />,
        sortable: false,
        filterable: false,
      },
      { field: 'name', headerName: 'Name', width: 170 },
      {
        field: 'languages',
        headerName: 'Languages',
        width: 200,
        wordWrap: 'wrap',
      },
      {
        field: 'region',
        headerName: 'Region',
        width: 200,
        // type: 'singleSelect',
        // valueOptions: ['basic', 'editor', 'admin'],
        // editable: true,
      },
      {
        field: 'population',
        headerName: 'Population',
        width: 200,
        // type: 'boolean',
        // editable: true,
      },
      // {
      //   field: 'createdAt',
      //   headerName: 'Created At',
      //   width: 200,
      //   renderCell: (params) =>
      //     moment(params.row.createdAt).format('YYY-MM-DD HH:MM:SS'),
      // },
      { field: 'row', headerName: 'Row #', width: 200, sortable: false },
      { field: 'ccn3', headerName: 'Id', width: 200 },
      {
        field: 'actions',
        headerName: 'Add to Cart',
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
          columns={columns}
          rows={countries.flat}
          // rows={[]}
          getRowId={(row: any) => row.row}
          /* onCellEditCommit={(params) => setRowId(params.id)} */
        />
      </Paper>
    </Box>
  );
}

export default Table;

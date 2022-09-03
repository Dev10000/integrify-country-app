/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Check } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { addItem } from '../features/counter/cartSlice';
import { AppDispatch, RootState } from '../app/store';
// @ts-ignore
function UsersActions({ params, rowId, setRowId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { countries } = useSelector((state: RootState) => state);

  const handleSubmit = async () => {
    setLoading(true);
    const { name, flagURL } = params.row;
    dispatch(addItem({ name: name, flagURL: flagURL }));

    setLoading(false);
  };

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}>
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            // bgcolor: green[500],
            // '&:hover': { bgcolor: green[700] },
          }}
          // disabled={params.id !== rowId}
          onClick={handleSubmit}>
          <Check />
        </Fab>
      )}
    </Box>
  );
}

export default UsersActions;

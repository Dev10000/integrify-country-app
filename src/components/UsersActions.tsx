/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Check } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';
// @ts-ignore
function UsersActions({ props }) {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
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
    </Box>
  );
}

export default UsersActions;

import React from 'react';
import { Container, CssBaseline, Paper } from '@mui/material';
import Table from './components/Table';
import Header from './components/Header';

export default function App() {
  return (
    <div>
      <CssBaseline />
      <Header />
      <Container>
        {/* <Paper
          sx={{
            // p: 2,
            display: 'flex',
            flexDirection: 'column',
            // height: 240,
          }}> */}
        <Table />
        {/* </Paper> */}
      </Container>
    </div>
  );
}

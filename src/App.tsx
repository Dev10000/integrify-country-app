import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Table from './components/Table';
import Header from './components/Header';

export default function App() {
  return (
    <div>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl">
        <Table />
      </Container>
    </div>
  );
}

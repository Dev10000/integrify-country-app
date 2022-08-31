import React from 'react';
import { Container } from '@mui/material';
import Table from './components/Table';
import Header from './components/Header';

export default function App() {
  return (
    <div>
      <Header />
      <Container>
        <Table />
      </Container>
    </div>
  );
}

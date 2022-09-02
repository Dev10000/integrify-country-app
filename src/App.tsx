import React, { useState } from 'react';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import Table from './components/Table';
import Header from './components/Header';

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <CssBaseline />
        <Header setMode={setMode} mode={mode} />
        <Container maxWidth="xl">
          <Table />
        </Container>
      </div>
    </ThemeProvider>
  );
}

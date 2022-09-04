import React, { useState } from 'react';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import {
  amber,
  blue,
  blueGrey,
  indigo,
  lightGreen,
  pink,
} from '@mui/material/colors';
import Table from './components/Table';
import Header from './components/Header';

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [color, setColor] = useState<
    | typeof blue[500]
    | typeof pink[500]
    | typeof lightGreen[500]
    | typeof amber[500]
    | typeof blueGrey[800]
    | typeof indigo[900]
  >(blueGrey[800]);

  const themeColorAndMode = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: color,
      },
    },
  });

  return (
    <ThemeProvider theme={themeColorAndMode}>
      <div>
        <CssBaseline />
        <Header setColor={setColor} setMode={setMode} mode={mode} />
        <Container maxWidth="xl">
          <Table />
        </Container>
      </div>
    </ThemeProvider>
  );
}

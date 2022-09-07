import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { useDispatch } from 'react-redux';
import Table from './components/Table';
import Header from './components/Header';
import { fetchCountriesThunk } from './features/countriesSlice';
import CountryPage from './components/CountryPage';
import { AppDispatch } from './app/store';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
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

  useEffect(() => {
    dispatch(fetchCountriesThunk());
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={themeColorAndMode}>
        <div>
          <CssBaseline />
          <Header setColor={setColor} setMode={setMode} mode={mode} />
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<Table />} />
              <Route path="/country" element={<CountryPage />} />
            </Routes>
          </Container>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

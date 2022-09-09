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

const colors = [
  blue[500],
  pink[500],
  lightGreen[500],
  amber[500],
  blueGrey[800],
  indigo[900],
] as const;

// type ColorTypes2 = keyof typeof colors;
type ColorTypes = typeof colors[number];

const modeFromLocalStorage = localStorage.getItem('mode') || 'light';
const colorFromLocalStorage = localStorage.getItem('color') || blueGrey[800];

function colorTypeGuard(colorKey: string): colorKey is ColorTypes {
  return colors.includes(colorKey as ColorTypes);
}

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [mode, setMode] = useState<'light' | 'dark'>(
    modeFromLocalStorage !== 'dark' ? 'light' : 'dark'
  );
  const [color, setColor] = useState<ColorTypes>(
    colorTypeGuard(colorFromLocalStorage)
      ? colorFromLocalStorage
      : blueGrey[800]
  );

  const themeColorAndMode = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: color,
      },
    },
  });

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('color', color);
  }, [color]);

  useEffect(() => {
    dispatch(fetchCountriesThunk());
  }, [dispatch]);

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

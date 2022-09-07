import React, { Fragment } from 'react';
import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { selectOpenCountry } from '../features/countriesSlice';
import { CountryData } from '../interface';
import capitalize from '../utils/utils';

function CountryPage() {
  const navigate = useNavigate();
  const selectCountry = useSelector(selectOpenCountry);
  const { items } = useSelector((state: RootState) => state.countries);
  const findCountry: CountryData | undefined = items.find(
    (country: CountryData) => country.name.common === selectCountry
  );

  let primitiveItems: [string, string | number | boolean][];
  let arrayItems: Array<Array<Array<number | string> | string | number>>;
  let objectItems: Array<
    Array<
      | Array<number | string>
      | string
      | number
      | { [key: string]: string | number | boolean }
    >
  >;

  if (findCountry) {
    primitiveItems = Object.entries(findCountry).filter(
      (item) => typeof findCountry[item[0] as keyof CountryData] !== 'object'
    );
    arrayItems = Object.entries(findCountry).filter(
      (item) => findCountry[item[0] as keyof CountryData] instanceof Array
    );
    objectItems = Object.entries(findCountry).filter(
      (item) =>
        findCountry[item[0] as keyof CountryData] instanceof Object &&
        !Array.isArray(findCountry[item[0] as keyof CountryData]) &&
        findCountry[item[0] as keyof CountryData] !== null
    );
  }

  const arrayTable = () => (
    <TableContainer sx={{ width: '100%', mb: 4 }} component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell align="left">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayItems.map((row) => (
            <TableRow
              key={row[0].toString()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {capitalize(row[0].toString())}
              </TableCell>
              <TableCell align="left">{row[1].toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const primitiveTable = () => (
    <TableContainer sx={{ width: '100%', mb: 4, mt: 4 }} component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell align="left">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {primitiveItems.map((row) => (
            <TableRow
              key={row[0].toString()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {capitalize(row[0].toString())}
              </TableCell>
              <TableCell align="left">{row[1].toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const objectTable = () => (
    <TableContainer sx={{ width: '100%' }} component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell align="left">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {objectItems.map((row) => (
            <TableRow
              key={row[0].toString()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {capitalize(row[0].toString())}
              </TableCell>
              <TableCell align="left">
                {Object.entries(row[1]).map(
                  (item) =>
                    `${capitalize(item[0])}: ${JSON.stringify(item[1])} | `
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          mt: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://source.unsplash.com/random)`,
        }}>
        {/* Increase the priority of the hero background image */}
        <img
          style={{ display: 'none' }}
          src="https://source.unsplash.com/random"
          alt=""
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom>
                {findCountry?.name.common}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Country details
              </Typography>
              <Link
                color="inherit"
                variant="subtitle1"
                href={`https://en.wikipedia.org/wiki/${findCountry?.name.common}`}
                target="_blank">
                Wikipedia Page
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardActionArea component="a" href="#">
            <Card sx={{ display: 'flex', minHeight: 250 }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  {findCountry?.name.common}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {findCountry?.region} - {findCountry?.subregion}
                </Typography>
                <Typography>
                  Capital: {findCountry?.capital.join(', ')}
                </Typography>
                <Typography>
                  Population: {findCountry?.population.toLocaleString()}
                </Typography>
                <Typography>
                  Languages:{' '}
                  {findCountry?.languages
                    ? Object.entries(findCountry?.languages).map(
                        ([, value], index) => `${(index ? ', ' : '') + value}`
                      )
                    : ''}
                </Typography>
                <Typography>
                  Currencies:{' '}
                  {findCountry?.currencies
                    ? Object.keys(findCountry.currencies).map(
                        (item) =>
                          `${findCountry.currencies[item].name}, ${findCountry.currencies[item].symbol}`
                      )
                    : ''}
                </Typography>
                <Typography>
                  Borders: {findCountry?.borders?.join(', ')}
                </Typography>
                <Typography>
                  Continents: {findCountry?.continents.join(', ')}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  width: 250,
                  p: 2,
                  m: 2,
                  display: { xs: 'none', sm: 'block' },
                }}>
                <CardMedia
                  component="img"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    border: 1,
                    m: 2,
                    // objectFit: 'contain',
                    display: { xs: 'none', sm: 'block' },
                  }}
                  image={findCountry?.flags.png}
                  alt={`Flag ${findCountry?.name.common}`}
                />
              </Box>
            </Card>
          </CardActionArea>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardActionArea component="a" href="#">
            <Card sx={{ display: 'flex', minHeight: 250 }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  Coat of Arms
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Name: {findCountry?.name.common}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Official Name: {findCountry?.name.official}
                </Typography>
                {findCountry?.name.nativeName
                  ? Object.keys(findCountry.name.nativeName).map((item) => (
                      <Fragment key={item}>
                        <Typography variant="subtitle1" color="text.secondary">
                          {`${item.toUpperCase()} - Name: ${
                            findCountry.name.nativeName[item].common
                          }`}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {`${item.toUpperCase()} - Official Name: ${
                            findCountry.name.nativeName[item].official
                          }`}
                        </Typography>
                      </Fragment>
                    ))
                  : ''}
              </CardContent>
              <CardMedia
                component="img"
                sx={{
                  width: 160,
                  objectFit: 'contain',
                  p: 2,
                  display: { xs: 'none', sm: 'block' },
                }}
                image={findCountry?.coatOfArms.png}
                alt={`Coat of Arms ${findCountry?.name.common}`}
              />
            </Card>
          </CardActionArea>
        </Grid>
      </Grid>

      {primitiveTable()}
      {arrayTable()}
      {objectTable()}

      <Box sx={{ mb: 4 }}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowBack />
        </IconButton>
      </Box>
    </>
  );
}

export default CountryPage;

// Testing MUI List Component
// - MUI Table Component is better for displaying all the country data as a spec sheet
// const list = () => (
//   <Paper sx={{ width: 250 }}>
//     <List>
//       {arrayItems.map((text: any) => (
//         <ListItem key={text[0]} disablePadding dense>
//           <ListItemButton>
//             <ListItemText primary={`${text[0].toUpperCase()}: `} />

//             <ListItemText primary={capitalize(text[1].toString())} />
//           </ListItemButton>
//           <Divider />
//         </ListItem>
//       ))}
//     </List>
//   </Paper>
// )

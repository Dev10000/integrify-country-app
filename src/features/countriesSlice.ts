import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import { CountryData, CountryFlat } from '../interface';

export interface CountriesState {
  items: CountryData[];
  isLoading: boolean;
  flat: CountryFlat[];
  selectedCountry: null | string;
}

const initialState: CountriesState = {
  items: [],
  isLoading: false,
  flat: [],
  selectedCountry: null,
};

export const fetchCountriesThunk = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const URL = 'https://restcountries.com/v3.1/all';
    const response = await axios.get(URL);
    const mapped = response.data.map((country: CountryData, index: number) => ({
      name: country.name.common,
      population: country.population,
      languages: country.languages
        ? Object.values(country.languages).join(', ')
        : country.languages,
      region: country.region,
      flagURL: country.flags.png,
      ccn3: country.ccn3,
      row: index.toString(),
    }));
    console.log('redux slice thunk async middleware mapped:', mapped);
    return {
      data: response.data,
      status: response.status,
      flat: mapped,
    };
  }
);

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    selectCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCountriesThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCountriesThunk.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.flat = action.payload.flat;
      state.isLoading = false;
    });
  },
});

export const { selectCountry } = countriesSlice.actions;

export const selectOpenCountry = (state: RootState) =>
  state.countries.selectedCountry;

export default countriesSlice.reducer;

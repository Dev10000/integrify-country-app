import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../app/store';
import { CountryData, CountryFlat } from '../interface';

export interface CountriesState {
  items: CountryData[];
  isLoading: boolean;
  flat: CountryFlat[];
  selectedCountry: null | string;
  searchInput: null | string | number;
}

const initialState: CountriesState = {
  items: [],
  isLoading: false,
  flat: [],
  selectedCountry: null,
  searchInput: '',
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
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
      if (typeof state.searchInput === 'string')
        state.searchInput.toLowerCase();
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

export const { selectCountry, setSearchInput } = countriesSlice.actions;

export const selectOpenCountry = (state: RootState) =>
  state.countries.selectedCountry;

export const selectSearchBarChange = (state: RootState) =>
  state.countries.searchInput;

export default countriesSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface CountriesState {
  items: any[];
  isLoading: boolean;
  flat: any[];
}

const initialState: CountriesState = {
  items: [],
  isLoading: false,
  flat: [],
};

export const fetchCountriesThunk = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const URL = 'https://restcountries.com/v3.1/all';
    const response = await axios.get(URL);
    const mapped = response.data.map((country: any, index: any) => ({
      name: country.name.common,
      population: country.population,
      // languges: Object.values(country.languages).join(', '),
      region: country.region,
      flag: country.flags.png,
      ccn3: country.ccn3,
      row: index.toString(),
    }));
    console.log('thunk mapped:', mapped);
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
  reducers: {},
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

export default countriesSlice.reducer;

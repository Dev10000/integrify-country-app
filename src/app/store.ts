import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import countriesReducer, { CountriesState } from '../features/countriesSlice';
import cartReducer, { CartState } from '../features/cartSlice';

const cartLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');

const preloadedState = {
  countries: {
    items: [],
    isLoading: false,
    flat: [],
    selectedCountry: null,
    searchInput: '',
  },
  cart: {
    cartItems: cartLocalStorage,
  },
};

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    cart: cartReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart.cartItems));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import countriesReducer from '../features/counter/countriesSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

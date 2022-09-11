import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type CartItems = {
  name: string;
  flagURL: string;
};

export interface CartState {
  cartItems: CartItems[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addItem: (state, action: PayloadAction<CartItems>) => {
      const findCountry = state.cartItems.find(
        (country) => country.name === action.payload.name
      );
      if (!findCountry) {
        state.cartItems.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (country) => country.name !== action.payload
      );
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;

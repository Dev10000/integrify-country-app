import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CartState {
  cartItems: { name: string; flagURL: string }[];
  itemExists: boolean;
}

const initialState: CartState = {
  cartItems: [],
  itemExists: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ name: string; flagURL: string }>
    ) => {
      const findItem = state.cartItems.find(
        (item) => item.flagURL === action.payload.flagURL
      );
      if (!findItem) {
        state.itemExists = true;
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.name !== action.payload
      );
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;

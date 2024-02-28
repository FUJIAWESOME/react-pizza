import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../../models/ICart';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { ICartDispatchArgs } from '../../pages/Cart';

export interface ICartState {
  items: ICartItem[];
  totalCount: number;
  totalPrice: number;
}

const cart: ICartState = getCartFromLS();

const initialState: ICartState = {
  items: cart.items,
  totalCount: cart.totalCount,
  totalPrice: cart.totalPrice,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        item.count += 1;
        item.price += action.payload.price;
      } else {
        state.items.push(action.payload);
      }

      state.totalCount += 1;
      state.totalPrice += action.payload.price;
    },
    removeItem: (state, action: PayloadAction<ICartDispatchArgs>) => {
      const { id, price } = action.payload;
      const isLastItem = state.items.length === 1;
      if (isLastItem) {
        state.totalCount = 0;
        state.totalPrice = 0;
      } else {
        state.totalCount -= 1;
        state.totalPrice -= price;
      }

      state.items = state.items.filter((item) => item.id !== id);
    },
    incrementCount: (state, action: PayloadAction<ICartDispatchArgs>) => {
      const { id, price } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        const count = item.count;
        item.price += price / count;
        item.count += 1;

        state.totalCount += 1;
        state.totalPrice += price / count;
      }
    },
    decrementCount: (state, action: PayloadAction<ICartDispatchArgs>) => {
      const { id, price } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        const count = item.count;
        const isLastItem = item.count === 1;
        if (isLastItem) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          item.price -= price / count;
          item.count -= 1;
        }

        state.totalCount -= 1;
        state.totalPrice -= price / count;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const selectItemCountById = (id: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id)?.count;

export const { addItem, removeItem, incrementCount, decrementCount, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

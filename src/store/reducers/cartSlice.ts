import { createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../../models/ICart';
// import isEqual from 'lodash.isequal';

interface ICartState {
  items: ICartItem[];
  totalCount: number;
  totalPrice: number;
}

const initialState: ICartState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state, action) => {
      // const item = state.items.find((item) => isEqual({ ...item, count: 1 }, action.payload));
      const item = state.items.find((item) => item.id === action.payload.id);
      // item ? (item.count += 1) : state.items.push(action.payload);

      if (item) {
        item.count += 1;
        item.price += action.payload.price;
      } else {
        state.items.push(action.payload);
      }

      state.totalCount += 1;
      state.totalPrice += action.payload.price;
    },
    removePizza: (state, action) => {
      // const currentItem = state.items.find((item) =>
      //   isEqual({ ...item, count: 1 }, action.payload),
      // );

      // if (currentItem) {
      //   state.items = state.items.filter((item: ICartItem) => item.id !== currentItem.id);
      // }
      const { id, price } = action.payload;
      const isLastItem = state.items.length === 1;
      if (isLastItem) {
        state.totalCount = 0;
        state.totalPrice = 0;
      } else {
        state.totalCount -= 1;
        state.totalPrice -= price;
      }

      state.items = state.items.filter((item: ICartItem) => item.id !== id);
    },
    incrementCount: (state, action) => {
      const { id, price } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.count += 1;
        item.price += price;

        state.totalCount += 1;
        state.totalPrice += price;
      }
      // const currentItem = state.items.find((item) =>
      //   isEqual({ ...item, count: 1 }, action.payload),
      // );

      // if (currentItem) {
      //   currentItem.count += 1;
      // }
    },
    decrementCount: (state, action) => {
      const { id, price } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        const count = item.count;
        const isLastItem = item.count === 1;
        if (isLastItem) {
          state.items = state.items.filter((item: ICartItem) => item.id !== id);
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

export const { addPizza, removePizza, incrementCount, decrementCount, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

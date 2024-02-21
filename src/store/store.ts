import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from './reducers/pizzaSlice';
import filterReducer from './reducers/filterSlice';
import cartReducer from './reducers/cartSlice';

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    filter: filterReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

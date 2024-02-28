import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizzaItem } from '../../models/IPizzaItem';
import { URL_API } from '../../consts';
import { IFilter } from '../../models/IFilter';
import { RootState } from '../store';
import { getParamsByFilter } from '../../utils/getParamsByFilter';

export enum FetchPizzaStatuses {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface IPizzaState {
  status: FetchPizzaStatuses;
  items: IPizzaItem[];
}

const initialState: IPizzaState = {
  status: FetchPizzaStatuses.LOADING,
  items: [],
};

export const getPizzas = createAsyncThunk('pizzas/getPizzas', async (filter: IFilter) => {
  const params = getParamsByFilter(filter);

  const res = await axios.get<IPizzaItem[]>(URL_API + params);
  return res.data;
});

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPizzas.pending, (state) => {
        state.items = [];
        state.status = FetchPizzaStatuses.LOADING;
      })
      .addCase(getPizzas.fulfilled, (state, action: PayloadAction<IPizzaItem[]>) => {
        state.items = action.payload;
        state.status = FetchPizzaStatuses.SUCCESS;
      })
      .addCase(getPizzas.rejected, (state) => {
        state.status = FetchPizzaStatuses.ERROR;
        state.items = [];
      });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;

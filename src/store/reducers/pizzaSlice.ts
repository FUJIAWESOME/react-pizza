import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizzaItem } from '../../models/IPizzaItem';
import { SORT_PARAMS, URL_API } from '../../consts';
import { IFilter } from '../../models/IFilter';

export interface IPizzaState {
  isLoading: boolean;
  items: IPizzaItem[];
  error: null | string | unknown;
}

const initialState: IPizzaState = {
  isLoading: false,
  items: [],
  error: null,
};

export const getPizzas = createAsyncThunk('pizzas/getPizzas', async (filter: IFilter, thunkApi) => {
  try {
    // const params = new URLSearchParams();

    // params.append('sortBy', SORT_PARAMS[filter.sortBy]);
    // params.append('order', 'desc');

    // const isSelectedCategory = filter.category;
    // if (isSelectedCategory) {
    //   params.append('category', String(filter.category));
    // }
    // const res = await axios.get<IPizzaItem[]>(URL_API, { params });

    const categoryParams = filter.category ? `&category=${filter.category}` : '';
    const searchParams = filter.search ? `&search=${filter.search}` : '';
    const params = `?sortBy=${SORT_PARAMS[filter.sortBy]}` + categoryParams + searchParams;

    const res = await axios.get<IPizzaItem[]>(URL_API + params);
    return res.data;
  } catch (error) {
    console.log(error);
    return thunkApi.rejectWithValue('Error');
  }
});

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPizzas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getPizzas.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.items = [];
      });
  },
});

export default pizzaSlice.reducer;

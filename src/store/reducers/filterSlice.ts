import { createSlice } from '@reduxjs/toolkit';
import { IFilter } from '../../models/IFilter';

const initialState: IFilter = {
  sortBy: 0,
  category: 0,
  search: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateSort: (state, action) => {
      state.sortBy = action.payload;
    },
    updateCategory: (state, action) => {
      state.category = action.payload;
    },
    updateSearch: (state, action) => {
      state.search = action.payload;
    },
    updateFilters: (state, action) => {
      state.sortBy = Number(action.payload.sortBy);
      state.category = Number(action.payload.category);
    },
  },
});

export const { updateCategory, updateSort, updateSearch, updateFilters } = filterSlice.actions;

export default filterSlice.reducer;

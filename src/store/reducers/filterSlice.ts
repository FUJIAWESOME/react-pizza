import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilter } from '../../models/IFilter';
import { RootState } from '../store';

const initialState: IFilter = {
  sortBy: 0,
  category: 0,
  search: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateSort: (state, action: PayloadAction<number>) => {
      state.sortBy = action.payload;
    },
    updateCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    updateSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    updateFilters: (state, action: PayloadAction<IFilter>) => {
      state.sortBy = Number(action.payload.sortBy);
      state.category = Number(action.payload.category);
    },
  },
});

export const selectCategory = (state: RootState) => state.filter.category;
export const selectSortBy = (state: RootState) => state.filter.sortBy;
export const selectFilter = (state: RootState) => state.filter;

export const { updateCategory, updateSort, updateSearch, updateFilters } = filterSlice.actions;

export default filterSlice.reducer;

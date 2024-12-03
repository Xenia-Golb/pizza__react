import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sort: "rating",
  },
  pageCount: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      state.pageCount = Number(action.payload.pageCount);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});
export const { setCategoryId, setSort, setPageCount, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;

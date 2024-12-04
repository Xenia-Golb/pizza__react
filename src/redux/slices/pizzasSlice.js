import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { search, category, sortBy, pageCount } = params;
    const { data } = await axios.get(
      `https://6740b1c4d0b59228b7f10754.mockapi.io/items?&category=${category}&sortBy=${sortBy}&order=desc&page=${pageCount}&limit=4${search}`
    );
    return data;
  }
);
const initialState = {
  items: [],
  status: "loading",
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(action, state) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;

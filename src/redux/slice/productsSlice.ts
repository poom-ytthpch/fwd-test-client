import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Plan } from "../../types";

const initialState: { plans: Plan[]; loading: boolean; error: string } = {
  plans: [],
  loading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const apiUrl = import.meta.env.VITE_BASE_URL + "/products";

    const response = await axios.get(apiUrl);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch products";
      });
  },
});



export default productsSlice.reducer;

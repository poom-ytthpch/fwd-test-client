import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InsurancePlan } from "../../types";
import axios from "axios";

const initialState: {
  insurancePlans: InsurancePlan[];
  loading: boolean;
  error: string;
} = {
  insurancePlans: [],
  loading: false,
  error: "",
};

export const fetchInsurancePlans = createAsyncThunk(
  "products/fetchInsurancePlans",
  async () => {
    const apiUrl = import.meta.env.VITE_BASE_URL + "/insurancePlans";

    const response = await axios.get(apiUrl);
    return response.data;
  }
);

const insurancePlansSlice = createSlice({
  name: "insurancePlans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsurancePlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInsurancePlans.fulfilled, (state, action) => {
        state.loading = false;
        state.insurancePlans = action.payload;
      })
      .addCase(fetchInsurancePlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch products";
      });
  },
});

export default insurancePlansSlice.reducer;

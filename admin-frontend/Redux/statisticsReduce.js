import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";

let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("x-access-token");
}

// Async thunk to fetch statistics (products + bulks) between two dates
export const fetchStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async ({ startDate, endDate }) => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}statistics?start=${startDate}&end=${endDate}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }

    return response.json(); // Expected shape: { products: [...], bulks: [...] }
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {
    data: { products: [], bulks: [] },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default statisticsSlice.reducer;

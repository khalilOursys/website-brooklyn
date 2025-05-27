import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";

// Ensure localStorage is only accessed in the browser
let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("x-access-token");
}

export const addBulkProduct = createAsyncThunk(
  "bulkProduct/addBulkProduct",
  async (payload) => {
    const response = await fetch(`${Configuration.BACK_BASEURL}bulkProducts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  }
);

export const editBulkProduct = createAsyncThunk(
  "bulkProduct/editBulkProduct",
  async (payload) => {
    const { id, ...bulkProductData } = payload; // Extract `id` from payload and keep the rest as `bulkProductData`

    /* if (!token) {
    throw new Error("No token found in localStorage");
  } */

    const response = await fetch(
      `${Configuration.BACK_BASEURL}bulkProducts/${id}`,
      {
        method: "PUT", // Use PUT for updating
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token
        },
        body: JSON.stringify(bulkProductData), // Send only the bulkProduct data (without `id`) in the body
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update bulkProduct");
    }

    return response.json();
  }
);

export const fetchBulkProducts = createAsyncThunk(
  "bulkProduct/fetchBulkProducts",
  async () => {
    const response = await fetch(`${Configuration.BACK_BASEURL}bulkProducts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
    });
    return response.json();
  }
);

export const getBulkProductById = createAsyncThunk(
  "bulkProducts/getBulkProductById",
  async (id) => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}bulkProducts/getBulkProductById/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token
        },
      }
    );
    return response.json();
  }
);

// Slice
const bulkProductsSlice = createSlice({
  name: "bulkProducts",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    profilUpdated(state, action) {
      fetch(`${Configuration.BACK_BASEURL}bulkProduct/updateProfile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token || "",
        },
        body: JSON.stringify(action.payload),
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBulkProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBulkProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = [...state.entities, action.payload];
      })
      .addCase(getBulkProductById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { profilUpdated } = bulkProductsSlice.actions;
export default bulkProductsSlice.reducer;

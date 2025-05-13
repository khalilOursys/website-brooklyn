import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";

// Ensure localStorage is only accessed in the browser
let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("x-access-token");
}

export const addProductBundle = createAsyncThunk(
  "productBundle/addProductBundle",
  async (payload) => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}productBundles`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token
        },
        body: JSON.stringify(payload),
      }
    );
    return response.json();
  }
);

export const editProductBundle = createAsyncThunk(
  "productBundle/editProductBundle",
  async (payload) => {
    const { id, ...productBundleData } = payload; // Extract `id` from payload and keep the rest as `productBundleData`

    /* if (!token) {
    throw new Error("No token found in localStorage");
  } */

    const response = await fetch(
      `${Configuration.BACK_BASEURL}productBundles/${id}`,
      {
        method: "PUT", // Use PUT for updating
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token
        },
        body: JSON.stringify(productBundleData), // Send only the productBundle data (without `id`) in the body
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update productBundle");
    }

    return response.json();
  }
);

export const fetchProductBundles = createAsyncThunk(
  "productBundle/fetchProductBundles",
  async () => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}productBundles`,
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

export const getProductBundleById = createAsyncThunk(
  "productBundles/getProductBundleById",
  async (id) => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}productBundles/getProductBundleById/${id}`,
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
const productBundlesSlice = createSlice({
  name: "productBundles",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    profilUpdated(state, action) {
      fetch(`${Configuration.BACK_BASEURL}productBundle/updateProfile`, {
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
      .addCase(getProductBundleById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductBundleById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = [...state.entities, action.payload];
      })
      .addCase(getProductBundleById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { profilUpdated } = productBundlesSlice.actions;
export default productBundlesSlice.reducer;

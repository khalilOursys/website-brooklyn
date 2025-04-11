import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";

// Ensure localStorage is only accessed in the browser
let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("x-access-token");
}

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (payload) => {
    const response = await fetch(`${Configuration.BACK_BASEURL}products`, {
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

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (payload) => {
    const { id, ...productData } = payload; // Extract `id` from payload and keep the rest as `productData`

    /* if (!token) {
    throw new Error("No token found in localStorage");
  } */

    const response = await fetch(
      `${Configuration.BACK_BASEURL}products/${id}`,
      {
        method: "PUT", // Use PUT for updating
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token
        },
        body: JSON.stringify(productData), // Send only the product data (without `id`) in the body
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return response.json();
  }
);

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await fetch(`${Configuration.BACK_BASEURL}products`, {
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

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id) => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}products/getProductById/${id}`,
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
const productsSlice = createSlice({
  name: "products",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    profilUpdated(state, action) {
      fetch(`${Configuration.BACK_BASEURL}product/updateProfile`, {
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
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = [...state.entities, action.payload];
      })
      .addCase(getProductById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { profilUpdated } = productsSlice.actions;
export default productsSlice.reducer;

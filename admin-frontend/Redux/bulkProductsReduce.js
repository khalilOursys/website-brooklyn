import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Ensure localStorage is only accessed in the browser
let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("x-access-token");
}

export const addBulkProduct = createAsyncThunk(
  "bulkProduct/addBulkProduct",
  async (payload) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}bulkProducts`,
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

export const editBulkProduct = createAsyncThunk(
  "bulkProduct/editBulkProduct",
  async (payload) => {
    const { id, ...bulkProductData } = payload; // Extract `id` from payload and keep the rest as `bulkProductData`

    /* if (!token) {
    throw new Error("No token found in localStorage");
  } */

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}bulkProducts/${id}`,
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}bulkProducts`,
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

export const getBulkProductById = createAsyncThunk(
  "bulkProducts/getBulkProductById",
  async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}bulkProducts/getBulkProductById/${id}`,
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

export const toggleBulkProductStatus = createAsyncThunk(
  "bulkProducts/toggleStatus",
  async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}bulkProducts/toggle-status/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to toggle bulkProduct status");
    }

    const result = await response.json();
    return { id, isActive: result.isActive };
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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}bulkProduct/updateProfile`, {
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
